from neo4j import GraphDatabase

uri = "bolt://localhost:7687"
driver = GraphDatabase.driver(uri, auth=("neo4j", "hackathon"))

def text_search_cypher(tx, searchString: str):
    print("In the func")
    results = tx.run("MATCH (n:Paper) WHERE n.abstract CONTAINS $searchString OR n.title CONTAINS $searchString return n", searchString=searchString)
    
    return results.data()


with driver.session() as session:
    print("Starting session....")
    results = session.execute_read(text_search_cypher, "climate")
    print(f"results: {results}")

driver.close()
