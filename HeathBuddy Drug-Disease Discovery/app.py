import streamlit as st
import streamlit.components.v1 as components

from langchain_community.llms import Ollama
from langchain import LLMChain, PromptTemplate

from neo4j import GraphDatabase
import os
from pyvis.network import Network
import networkx as nx

# Database connection parameters
URI = "bolt://localhost:7687"
USERNAME = "neo4j"
PASSWORD = "root1234"

# Establishing Neo4j connection
def create_neo4j_session(uri, username, password):
    driver = GraphDatabase.driver(uri, auth=(username, password))
    return driver.session()

# Close Neo4j session
def close_neo4j_session(session):
    session.close()

def create_indexes(session):
    session.run("CREATE INDEX IF NOT EXISTS FOR (d:Disease) ON (d.name)")
    session.run("CREATE INDEX IF NOT EXISTS FOR (m:Medication) ON (m.name)")
    session.run("CREATE INDEX IF NOT EXISTS FOR (s:Symptom) ON (s.name)")
    session.run("CREATE INDEX IF NOT EXISTS FOR (c:Composition) ON (c.name)")

session = create_neo4j_session(URI, USERNAME, PASSWORD)
create_indexes(session)
close_neo4j_session(session)

# Define the PromptTemplates for different query types
templates = {
    "disease_to_drugs": """
    Convert the following natural language query into a Cypher query:
    "Fetch all drugs that treat {name}"

    Cypher Query:
    MATCH (:Disease {{name: "{name}"}})-[:TREATS]->(m:Medication) RETURN m.name
    """,
    "drug_to_diseases": """
    Convert the following natural language query into a Cypher query:
    "Fetch all diseases treated by {name}"

    Cypher Query:
    MATCH (d:Disease)-[:TREATS]->(m:Medication {{name: "{name}"}}) RETURN d.name
    """,
    "disease_to_symptoms": """
    Convert the following natural language query into a Cypher query:
    "Fetch all symtomps with a disease {name}"

    Cypher Query:
    MATCH (d:Disease {{name: "{name}"}})-[:HAS_SYMPTOM]->(s:Symptom) RETURN s.name
    """,
    "symptom_to_diseases": """
    Convert the following natural language query into a Cypher query:
    "Fetch all diseases with a symptom {name}"

    Cypher Query:
    MATCH (d:Disease)-[:HAS_SYMPTOM]->(s:Symptom {{name: "{name}"}}) RETURN d.name
    """,
    "composition_to_drugs": """
    Convert the following natural language query into a Cypher query:
    "Fetch all medications containing the composition {name}"

    Cypher Query:
    MATCH (:Composition {{name: "{name}"}})<-[:CONTAINS]-(m:Medication) RETURN m.name
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

def visualize_graph(results, query_type, name):
    G = nx.DiGraph()

    if query_type == "disease_to_drugs":
        disease_node = name
        for record in results:
            drug_node = record["m.name"]
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
    elif query_type == "disease_to_symptoms":
        disease_node = name
        for record in results:
            symptom_node = record["s.name"]
            G.add_node(disease_node, title=disease_node, group=1)
            G.add_node(symptom_node, title=symptom_node, group=2)
            G.add_edge(disease_node, symptom_node)
    elif query_type == "symptom_to_diseases":
        symptom_node = name
        for record in results:
            disease_node = record["d.name"]
            G.add_node(symptom_node, title=symptom_node, group=1)
            G.add_node(disease_node, title=disease_node, group=2)
            G.add_edge(symptom_node, disease_node)
    elif query_type == "composition_to_drugs":
        composition_node = name
        for record in results:
            drug_node = record["m.name"]
            G.add_node(composition_node, title=composition_node, group=1, label='Composition')
            G.add_node(drug_node, title=drug_node, group=2, label='Drug')
            G.add_edge(composition_node, drug_node)

    net = Network(notebook=False, width="100%", height="500px", directed=True)
    net.from_nx(G)

    path = "graph.html"
    net.save_graph(path)
    return path

# Function to add a new disease
def add_disease(session, disease_name):
    query = "CREATE (d:Disease {name: $name})"
    session.run(query, name=disease_name)

def add_symptom(session, symptom_name):
    query = "CREATE (s:Symptom {name: $name})"
    session.run(query, name=symptom_name)

def add_disease_symptom_relationship(session, disease_name, symptom_name):
    query = """
    MATCH (d:Disease {name: $disease_name})
    MATCH (s:Symptom {name: $symptom_name})
    CREATE (d)-[:HAS_SYMPTOM]->(s)
    """
    session.run(query, disease_name=disease_name, symptom_name=symptom_name)

# Function to add a new medication
def add_medication(session, medication_name):
    query = "CREATE (m:Medication {name: $name})"
    session.run(query, name=medication_name)

def add_composition(session, composition_name):
    query = "CREATE (c:Composition {name: $name})"
    session.run(query, name=composition_name)

def add_medication_composition_relationship(session, medication_name, composition_name):
    query = """
    MATCH (m:Medication {name: $medication_name})
    MATCH (c:Composition {name: $composition_name})
    CREATE (m)-[:CONTAINS]->(c)
    """
    session.run(query, medication_name=medication_name, composition_name=composition_name)

# Function to add a relationship between medication and disease
def add_relationship(session, medication_name, disease_name):
    query = """
    MATCH (m:Medication {name: $med_name})
    MATCH (d:Disease {name: $dis_name})
    CREATE (m)-[:TREATS]->(d)
    """
    session.run(query, med_name=medication_name, dis_name=disease_name)

def fetch_disease_names(session):
    query = "MATCH (d:Disease) RETURN DISTINCT d.name AS name"
    result = session.run(query)
    return [record["name"] for record in result]

def fetch_medication_names(session):
    query = "MATCH (m:Medication) RETURN DISTINCT m.name AS name"
    result = session.run(query)
    return [record["name"] for record in result]

def fetch_symtom_names(session):
    query = "MATCH (s:Symptom) RETURN DISTINCT s.name AS name"
    result = session.run(query)
    return [record["name"] for record in result]

def save_feedback(session, medicine_name, feedback, rating):
    query = """
    MATCH (m:Medication {name: $name})
    SET m.feedback = $feedback, m.rating = $rating
    """
    session.run(query, name=medicine_name, feedback=feedback, rating=rating)

def fetch_feedback_data(session):
    query = """
    MATCH (m:Medication)
    WHERE m.rating IS NOT NULL AND m.feedback IS NOT NULL
    RETURN m.name AS name, m.rating AS rating, m.feedback AS feedback
    """
    result = session.run(query)
    feedback_data = []
    for record in result:
        feedback_data.append({
            "name": record["name"],
            "rating": record["rating"],
            "feedback": record["feedback"]
        })
    return feedback_data

def display_table(results, key, label):
    result_list = [record[key] for record in results]
    if result_list:
        st.table({label: result_list})
    else:
        st.write("No results found.")


# Streamlit UI
def main():
    st.set_page_config(page_title="HealthBuddy - Drug-Disease Discovery", layout="wide", page_icon="🕵🏼‍♂️")
    st.sidebar.title("Health Buddy - Drug-Disease Discovery")
    selection = st.sidebar.radio("Go to", ["Query System", "Add New Data", "Provide Feedback", "View Feedback Data", "GDS Analysis","HeathBuddy Advice"])

    if selection == "Query System":
        st.title("Query System")
        try:
            session = create_neo4j_session(URI, USERNAME, PASSWORD)
            disease_names = fetch_disease_names(session)
            medication_names = fetch_medication_names(session)
            symptom_names = fetch_symtom_names(session)
            close_neo4j_session(session)
        except Exception as e:
            st.error(f"Failed to fetch data from Neo4j: {e}")
            disease_names = []
            medication_names = []
            symptom_names = []

        query_type_label = st.selectbox(
            "Select the type of query:",
            [
                "Fetch all drugs that treat a disease",
                "Fetch all diseases treated by a drug",
                "Fetch all symtomps with a disease",
                "Fetch all diseases with a symptom",
                "Fetch all medications with a composition"
            ]
        )

        query_type_map = {
            "Fetch all drugs that treat a disease": "disease_to_drugs",
            "Fetch all diseases treated by a drug": "drug_to_diseases",
            "Fetch all symtomps with a disease": "disease_to_symptoms",
            "Fetch all diseases with a symptom": "symptom_to_diseases",
            "Fetch all medications with a composition": "composition_to_drugs"
        }

        query_type = query_type_map[query_type_label]

        if query_type in ["disease_to_drugs", "disease_to_symptoms"]:
            name = st.selectbox("Select a disease:", disease_names)
        elif query_type == "drug_to_diseases":
            name = st.selectbox("Select a medication:", medication_names)
        elif query_type == "symptom_to_diseases":
            name = st.selectbox("Select a symptom:", symptom_names)
        elif query_type == "composition_to_drugs":
            name = st.text_input("Enter a composition name:")

        if st.button("Submit"):
          with st.spinner("Running query..."): 
            try:
                cypher_query = generate_cypher_query(query_type, name)
                cypher_query = extract_cypher_query(cypher_query)
                print(cypher_query)
                session = create_neo4j_session(URI, USERNAME, PASSWORD)
                results = execute_cypher_query(session, cypher_query)
                close_neo4j_session(session)
                st.write(f"Results for '{name}':")
                if query_type == "disease_to_drugs":
                        display_table(results, "m.name", "Drug")
                elif query_type == "drug_to_diseases":
                        display_table(results, "d.name", "Disease")
                elif query_type == "disease_to_symptoms":
                        display_table(results, "s.name", "Symptom")
                elif query_type == "symptom_to_diseases":
                        display_table(results, "d.name", "Disease")
                elif query_type == "composition_to_drugs":
                        display_table(results, "m.name", "Drug")
                # results = [record["s.name"] for record in results]
                # if results:
                #         # Display results as a table
                #         st.table({"Results": results})

                graph_path = visualize_graph(results, query_type, name)
                components.html(open(graph_path, "r", encoding="utf-8").read(), height=500)
            except Exception as e:
                st.error(f"Failed to process query: {e}")

    elif selection == "Add New Data":
        st.title("Add New Data")
        data_type = st.selectbox("Select data type to add:", ["Disease", "Symptom", "Medication", "Composition"])
        
        if data_type == "Disease":
            disease_name = st.text_input("Enter the disease name:")
            if st.button("Add Disease"):
                try:
                    session = create_neo4j_session(URI, USERNAME, PASSWORD)
                    add_disease(session, disease_name)
                    close_neo4j_session(session)
                    st.success(f"Disease '{disease_name}' added successfully!")
                except Exception as e:
                    st.error(f"Failed to add disease: {e}")

        elif data_type == "Symptom":
            symptom_name = st.text_input("Enter the symptom name:")
            disease_name = st.selectbox("Select associated disease:", fetch_disease_names(create_neo4j_session(URI, USERNAME, PASSWORD)))
            if st.button("Add Symptom"):
                try:
                    session = create_neo4j_session(URI, USERNAME, PASSWORD)
                    add_symptom(session, symptom_name)
                    add_disease_symptom_relationship(session, disease_name, symptom_name)
                    close_neo4j_session(session)
                    st.success(f"Symptom '{symptom_name}' added successfully!")
                except Exception as e:
                    st.error(f"Failed to add symptom: {e}")

        elif data_type == "Medication":
            medication_name = st.text_input("Enter the medication name:")
            if st.button("Add Medication"):
                try:
                    session = create_neo4j_session(URI, USERNAME, PASSWORD)
                    add_medication(session, medication_name)
                    close_neo4j_session(session)
                    st.success(f"Medication '{medication_name}' added successfully!")
                except Exception as e:
                    st.error(f"Failed to add medication: {e}")

        elif data_type == "Composition":
            composition_name = st.text_input("Enter the composition name:")
            medication_name = st.selectbox("Select associated medication:", fetch_medication_names(create_neo4j_session(URI, USERNAME, PASSWORD)))
            if st.button("Add Composition"):
                try:
                    session = create_neo4j_session(URI, USERNAME, PASSWORD)
                    add_composition(session, composition_name)
                    add_medication_composition_relationship(session, medication_name, composition_name)
                    close_neo4j_session(session)
                    st.success(f"Composition '{composition_name}' added successfully!")
                except Exception as e:
                    st.error(f"Failed to add composition: {e}")

    elif selection == "Provide Feedback":
        st.title("Provide Feedback")
        medication_name = st.selectbox("Select medication:", fetch_medication_names(create_neo4j_session(URI, USERNAME, PASSWORD)))
        feedback = st.text_area("Enter your feedback:")
        rating = st.slider("Rate the medication (1-5):", 1, 5)

        if st.button("Submit Feedback"):
            try:
                session = create_neo4j_session(URI, USERNAME, PASSWORD)
                save_feedback(session, medication_name, feedback, rating)
                close_neo4j_session(session)
                st.success(f"Feedback for '{medication_name}' submitted successfully!")
            except Exception as e:
                st.error(f"Failed to submit feedback: {e}")

    elif selection == "View Feedback Data":
        st.title("View Feedback Data")
        try:
            session = create_neo4j_session(URI, USERNAME, PASSWORD)
            feedback_data = fetch_feedback_data(session)
            close_neo4j_session(session)

            for feedback in feedback_data:
                st.write(f"Medication: {feedback['name']}")
                st.write(f"Rating: {feedback['rating']}")
                st.write(f"Feedback: {feedback['feedback']}")
                st.write("---")

        except Exception as e:
            st.error(f"Failed to fetch feedback data: {e}")

    elif selection == "GDS Analysis":
        st.title("Graph Data Science (GDS) Analysis")
        try:
            session = create_neo4j_session(URI, USERNAME, PASSWORD)

            st.write("Running PageRank Algorithm to identify the most central nodes (diseases/medications)...")
            pagerank_query = """
            CALL gds.graph.project(
                'med_disease_graph',
                ['Medication', 'Disease'],
                {
                    TREATS: {
                        orientation: 'NATURAL',
                        properties: {}
                    }
                }
            )
            """
            session.run(pagerank_query)

            pagerank_result_query = """
            CALL gds.pageRank.stream('med_disease_graph')
            YIELD nodeId, score
            RETURN gds.util.asNode(nodeId).name AS name, score
            ORDER BY score DESC
            LIMIT 10
            """
            results = session.run(pagerank_result_query)
            st.write("Top 10 most central nodes:")
            for record in results:
                st.write(f"Name: {record['name']}, Score: {record['score']}")

            close_neo4j_session(session)

        except Exception as e:
            st.error(f"Failed to run GDS analysis: {e}")

        
# Chatbot
    elif selection == "HeathBuddy Advice":
        st.title("HealthBuddy Chatbot for Self-Diagnosis and Advice")


        symptoms_input = st.text_input("Enter symptoms separated by commas (e.g., Body Pain, Cough, Headache):")
        symptoms = [symptom.strip() for symptom in symptoms_input.split(',') if symptom.strip()]

        try:
            if symptoms:
                session = create_neo4j_session(URI, USERNAME, PASSWORD)
                diseases = []
                
                for symptom in symptoms:
                    cypher_query = generate_cypher_query("symptom_to_diseases", symptom)
                    formatted_query = extract_cypher_query(cypher_query)
                    results = execute_cypher_query(session, formatted_query)
                    diseases.extend([record["d.name"] for record in results])
                
                st.write("Possible diseases based on symptoms:")
                st.table(diseases)

                medications = []
                for disease in set(diseases):
                    cypher_query = generate_cypher_query("disease_to_drugs", disease)
                    formatted_query = extract_cypher_query(cypher_query)
                    print(formatted_query)
                    results = execute_cypher_query(session, formatted_query)
                    medications.extend([record["m.name"] for record in results])

                st.write("Recommended medications based on possible diseases:")
                st.table(medications)

                close_neo4j_session(session)

        except Exception as e:
            st.error(f"Failed to get advice: {e}")

if __name__ == "__main__":
    main()
