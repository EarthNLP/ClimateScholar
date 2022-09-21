from typing import Optional
from fastapi import Body, Request, FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from neo4j import GraphDatabase
import pandas as pd
from itertools import tee
import random

app = FastAPI(debug=True)

uri = "bolt://localhost:7687"
driver = GraphDatabase.driver(uri, auth=("neo4j", "hackathon"))

# add our app middleware
origins = [
    "http://localhost:3000",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3232",
    "http://localhost:5000",
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# init our data models
class SearchRequest(BaseModel):
    searchString: str

class EntitySearchRequest(BaseModel):
    entity1: str
    entity2: str

def nWise(iterable, n=3):
    """ https://stackoverflow.com/questions/44765896/iterate-over-list-selecting-multiple-elements-at-a-time-in-python """
    a, b, c = tee(iterable, 3)
    next(b, None)
    next(c, None)
    next(c, None)
    return zip(a, b, c)

def get_all_ents_cypher(tx):
    results = tx.run("MATCH (e:Entity) RETURN e")

    return [ent["e"]["entity_name"] for ent in results.data()]

def get_all_authors_cypher(tx):
    results = tx.run("MATCH (a:Author) RETURN a")

    return results.data()

def get_all_topics_cypher(tx):
    results = tx.run("MATCH (t:Topic) RETURN t")

    return [topic['topic_name'] for topic in results]

def text_search_cypher(tx, searchString: str):
    results = tx.run("MATCH (n:Paper) WHERE n.abstract CONTAINS $searchString OR n.title CONTAINS $searchString RETURN n LIMIT 10", searchString=searchString)

    return results.data()

def ent_search_cypher(tx, ent1: str, ent2: str):

    results = tx.run("MATCH (a:Entity {entity_name: $ent1}), (b:Entity {entity_name: $ent2}), p = shortestPath((a)-[*]-(b))RETURN p", ent1=ent1, ent2=ent2)
    
    returnConnection = []
    returnNodes = []
    returnLinks = []
    relationshipDict = results.graph()._relationships
    
    for relationship in results.graph()._relationships:
        nodes = relationshipDict[relationship].nodes
        i = 0
        source_node_id = ""
        for node in nodes:
            # print("--------------------------------------")
            # print(f"node: {node}")
            # for property, value in vars(node).items():
            #     print(property, ":", value)
            # TODO: Cleaner way of doing this
            if i == 0:
                source_node_id = node.element_id  

            if i == 1:
                returnConnection.append({"data": {"source": source_node_id , "target": node.element_id, "label": relationshipDict[relationship].type}})
                returnLinks.append({"source": source_node_id, "target": node.element_id})
            else:
                i += 1

                       

            node_label, *_ = node.labels
            name = "Could not assign name"

            nodeDict = {"id": node.element_id}

            if node_label == "Entity":
                name = node._properties['entity_name']
            elif node_label == "Topic":
                name = node._properties['topic_name']
            elif node_label == "Paper":
                name = node._properties['title']
            elif node_label == "Author":
                name = node._properties['author_name']
            
            nodeDict["label"] = name

            returnConnection.append({"data": nodeDict})
            returnNodes.append({'id': node.element_id})


    #print(f"alignedList: {alignedList}")
    return {"flatList": returnConnection, "nodes": returnNodes, "links": returnLinks}

@app.get("/test-ping")
async def pong():
    """ Used to test if the API is alive """
    return {"Hello": "World"}

@app.post("/request")
async def testRequest(req: dict = Body(...)):
    """ You can use this to test what the body of the request looks like """
    print(req)
    return {"Hello": "World"}

@app.post("/full-text-search")
async def text_search(searchRequest: dict = Body(...)):
    """ Used to perform a full text search over abstract and titles within the graph  """
    results = []

    with driver.session() as session:
        results = session.execute_read(text_search_cypher, searchRequest['searchString'])
    
    driver.close()

    return {"results": results}

@app.post("/ent-search")
async def ent_search(searchRequest: dict = Body(...)):
    """ Used to find the shortest path between two entities in the graph  """
    results = {}

    with driver.session() as session:
        results = session.execute_read(ent_search_cypher, searchRequest["entity1"], searchRequest["entity2"])

    driver.close()

    return {"results": results}

@app.get("/get-all-fields")
async def get_all_fields():
    """ Used to grab all entities, authors, and topics for use in populating the ent search dropdown  """
    ents = []
    topics = []
    authors = []

    with driver.session() as session:
        ents = session.execute_read(get_all_ents_cypher)
        #topics = session.execute_read(get_all_topics_cypher)
        #authors = session.execute_read(get_all_authors_cypher)

    driver.close()

    return {"ents": ents, "authors": authors, "topics": topics}