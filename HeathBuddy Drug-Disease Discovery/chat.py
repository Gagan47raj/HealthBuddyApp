import streamlit as st
from langchain_community.llms import Ollama
from langchain import LLMChain, PromptTemplate
from neo4j import GraphDatabase
import redis
import networkx as nx
from pyvis.network import Network
import os

# Database connection parameters
URI = "bolt://localhost:7687"
USERNAME = "neo4j"
PASSWORD = "root1234"

# Redis cache setup
cache = redis.StrictRedis(host='localhost', port=6379, db=0)

# Establishing Neo4j connection
def create_neo4j_session(uri, username, password):
    driver = GraphDatabase.driver(uri, auth=(username, password))
    return driver.session()

# Close Neo4j session
def close_neo4j_session(session):
    session.close()

# Define the PromptTemplates for different query types
templates = {
    "symptom_to_disease": """
    Convert the following natural language query into a Cypher query:
    "Fetch all diseases related to {symptoms}"

    Cypher Query:
    MATCH (d:Disease)-[:HAS_SYMPTOM]->(s:Symptom {{name: "{symptoms}"}}) RETURN d.name
    """,
    "disease_to_drugs": """
    Convert the following natural language query into a Cypher query:
    "Fetch all drugs that treat {name}"

    Cypher Query:
    MATCH (d:Medication)-[:TREATS]->(:Disease {{name: "{name}"}}) RETURN d.name
    """
}

# Initialize the LLM and prompt templates
ollama = Ollama(base_url="http://localhost:11434", model="mistral")

# Function to get the appropriate prompt template
def get_prompt_template(query_type):
    template = templates.get(query_type)
    return PromptTemplate(template=template, input_variables=["name"])

# Function to convert natural language query to Cypher query
def generate_cypher_query(query_type, name):
    prompt = get_prompt_template(query_type)
    llm_chain = LLMChain(prompt=prompt, llm=ollama)
    return llm_chain.run(name=name)

# Function to execute Cypher query
def execute_cypher_query(session, cypher_query):
    result = session.run(cypher_query)
    return [record for record in result]

# Function to extract and format the generated Cypher query
def extract_cypher_query(llm_output):
    start_idx = llm_output.find("MATCH")
    end_idx = llm_output.find("RETURN") + len("RETURN d.name")
    return llm_output[start_idx:end_idx]

# Function to create and visualize the graph
def visualize_graph(results, query_type, name):
    G = nx.DiGraph()

    if query_type == "disease_to_drugs":
        disease_node = name
        for record in results:
            drug_node = record["d.name"]
            G.add_node(disease_node, title=disease_node, group=1)
            G.add_node(drug_node, title=drug_node, group=2)
            G.add_edge(disease_node, drug_node)
    elif query_type == "drug_to_diseases":
        drug_node = name
        for record in results:
            disease_node = record["d.name"]
            G.add_node(drug_node, title=drug_node, group=1)
            G.add_node(disease_node, title=disease_node, group=2)
            G.add_edge(drug_node, disease_node)

    net = Network(notebook=False, width="100%", height="500px", directed=True)
    net.from_nx(G)

    path = "graph.html"
    net.save_graph(path)
    return path

# Function to add a new disease
def add_disease(session, disease_name):
    query = "CREATE (d:Disease {name: $name})"
    session.run(query, name=disease_name)

# Function to add a new medication
def add_medication(session, medication_name):
    query = "CREATE (m:Medication {name: $name})"
    session.run(query, name=medication_name)

# Function to add a relationship between medication and disease
def add_relationship(session, medication_name, disease_name):
    query = """
    MATCH (m:Medication {name: $med_name})
    MATCH (d:Disease {name: $dis_name})
    CREATE (m)-[:TREATS]->(d)
    """
    session.run(query, med_name=medication_name, dis_name=disease_name)

# Functions to fetch disease and medication names from Neo4j
def fetch_disease_names(session):
    query = "MATCH (d:Disease) RETURN DISTINCT d.name AS name"
    result = session.run(query)
    return [record["name"] for record in result]

def fetch_medication_names(session):
    query = "MATCH (m:Medication) RETURN DISTINCT m.name AS name"
    result = session.run(query)
    return [record["name"] for record in result]

# Streamlit UI for main page
def main_page():
    st.title("Health Data Management")

    st.header("Add New Data")

    data_type = st.selectbox("Select Data Type to Add:", ["Disease", "Medication", "Relationship"])
    
    if data_type == "Disease":
        disease_name = st.text_input("Disease Name:")
        if st.button("Add Disease"):
            session = create_neo4j_session(URI, USERNAME, PASSWORD)
            add_disease(session, disease_name)
            close_neo4j_session(session)
            st.success(f"Disease '{disease_name}' added successfully.")
    
    elif data_type == "Medication":
        medication_name = st.text_input("Medication Name:")
        if st.button("Add Medication"):
            session = create_neo4j_session(URI, USERNAME, PASSWORD)
            add_medication(session, medication_name)
            close_neo4j_session(session)
            st.success(f"Medication '{medication_name}' added successfully.")
    
    elif data_type == "Relationship":
        try:
            session = create_neo4j_session(URI, USERNAME, PASSWORD)
            disease_names = fetch_disease_names(session)
            medication_names = fetch_medication_names(session)
            close_neo4j_session(session)
        except Exception as e:
            st.error(f"Failed to fetch data from Neo4j: {e}")
            disease_names = []
            medication_names = []

        medication_name = st.selectbox("Medication Name:", medication_names)
        disease_name = st.selectbox("Disease Name:", disease_names)
        if st.button("Add Relationship"):
            session = create_neo4j_session(URI, USERNAME, PASSWORD)
            add_relationship(session, medication_name, disease_name)
            close_neo4j_session(session)
            st.success(f"Relationship between '{medication_name}' and '{disease_name}' added successfully.")

# Streamlit UI for chatbot page
def chatbot_page():
    st.title("Health Chatbot for Self-Diagnosis and Advice")

    # Chatbot interface
    st.header("Chat with the Health Bot")
    user_input = st.text_input("Describe your symptoms:")

    if st.button("Get Advice"):
        with st.spinner("Processing..."):
            query_key = f"symptom_to_disease_{user_input}"
            cached_result = cache.get(query_key)

            if cached_result:
                st.write("Using cached result.")
                cypher_query = cached_result.decode('utf-8')
            else:
                cypher_query = generate_cypher_query("symptom_to_disease", user_input)
                cache.set(query_key, cypher_query)
            
            st.write("Generated Cypher Query:", cypher_query)
            
            try:
                session = create_neo4j_session(URI, USERNAME, PASSWORD)
                extracted_query = extract_cypher_query(cypher_query)
                st.write("Extracted Cypher Query:", extracted_query)
                
                result = execute_cypher_query(session, extracted_query)
                
                if result:
                    st.write("Possible Diseases:")
                    disease_names = [record["d.name"] for record in result]
                    st.table({"Diseases": disease_names})

                    # Medicine Recommendation
                    recommended_meds = []
                    for disease in disease_names:
                        query_key = f"disease_to_drugs_{disease}"
                        cached_result = cache.get(query_key)
                        
                        if cached_result:
                            st.write(f"Using cached result for {disease}.")
                            cypher_query = cached_result.decode('utf-8')
                        else:
                            cypher_query = generate_cypher_query("disease_to_drugs", disease)
                            cache.set(query_key, cypher_query)
                        
                        extracted_query = extract_cypher_query(cypher_query)
                        result = execute_cypher_query(session, extracted_query)
                        meds = [record["d.name"] for record in result]
                        recommended_meds.extend(meds)
                    
                    if recommended_meds:
                        st.write("Recommended Medicines:")
                        st.table({"Medicines": recommended_meds})
                
                close_neo4j_session(session)
            except Exception as e:
                st.write("Query execution failed:", e)

# Main function to handle page navigation
def main():
    st.sidebar.title("Navigation")
    page = st.sidebar.radio("Go to", ["Home", "Chatbot"])

    if page == "Home":
        main_page()
    elif page == "Chatbot":
        chatbot_page()

if _name_ == "_main_":
    main()