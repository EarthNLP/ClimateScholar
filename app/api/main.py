from typing import Optional
from fastapi import Body, Request, FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from neo4j import GraphDatabase

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

def get_all_ents_cypher(tx):
    results = tx.run("MATCH (e:Entity) RETURN e")

    return [ent['entity_name'] for ent in results]

def get_all_authors_cypher(tx):
    results = tx.run("MATCH (a:Author) RETURN a")

    return results.data()

def get_all_topics_cypher(tx):
    results = tx.run("MATCH (t:Topic) RETURN t")

    return [topic['topic_name'] for topic in results]

def text_search_cypher(tx, searchString: str):
    print("In the func")
    results = tx.run("MATCH (n:Paper) WHERE n.abstract CONTAINS $searchString OR n.title CONTAINS $searchString RETURN n LIMIT 10", searchString=searchString)
    
    return results.data()

def ent_search_cypher(tx, ent1: str, ent2: str):
    results = tx.run("MATCH (a:Entity {entity_name: $ent1}), (b:Entity {entity_name: $ent2}), p = shortestPath((a)-[*]-(b))RETURN p", ent1=ent1, ent2=ent2)
    
    return results.data()

@app.get("/test-ping")
def pong():
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
def ent_search(searchRequest: EntitySearchRequest):
    """ Used to find the shortest path between two entities in the graph  """
    results = {}

    with driver.session() as session:
        results = session.execute_read(ent_search_cypher, searchRequest.entity1, searchRequest.entity2)

    driver.close()

    return {"results": results}

@app.get("/get-all-fields")
def get_all_fields():
    """ Used to grab all entities, authors, and topics for use in populating the ent search dropdown  """
    ents = []
    topics = []
    authors = []

    with driver.session() as session:
        ents = session.execute_read(get_all_ents_cypher)
        topics = session.execute_read(get_all_topics_cypher)
        authors = session.execute_read(get_all_authors_cypher)

    driver.close()

    return {"ents": ents, "authors": authors, "topics": topics}