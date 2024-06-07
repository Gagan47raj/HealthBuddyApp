from neo4j import GraphDatabase

uri = "bolt://localhost:7687"
username = "neo4j"
password = "root1234"

diseases_and_medications = {
    "Dengue Fever": ["Paracetamol (Acetaminophen)"],
    "Malaria": ["Chloroquine", "Artemether", "Lumefantrine"],
    "Tuberculosis (TB)": ["Isoniazid", "Rifampicin", "Ethambutol", "Pyrazinamide"],
    "Cholera": ["Doxycycline", "Azithromycin"],
    "Hepatitis A": ["No specific antiviral medication (supportive care)"],
    "Hepatitis B": ["Tenofovir", "Entecavir", "Lamivudine"],
    "Hepatitis C": ["Sofosbuvir", "Ledipasvir", "Ribavirin"],
    "Typhoid Fever": ["Ciprofloxacin", "Azithromycin", "Ceftriaxone"],
    "Leprosy": ["Dapsone", "Rifampicin", "Clofazimine"],
    "Rabies": ["Rabies immunoglobulin", "Rabies vaccine"],
    "HIV/AIDS": ["Zidovudine", "Lamivudine", "Efavirenz", "Tenofovir", "Emtricitabine"],
    "Chikungunya": ["No specific antiviral medication (supportive care)"],
    "Japanese Encephalitis": ["No specific antiviral medication (supportive care)"],
    "Leishmaniasis (Kala-azar)": ["Amphotericin B", "Miltefosine"],
    "Filariasis": ["Diethylcarbamazine", "Ivermectin", "Albendazole"],
    "Acute Respiratory Infections (ARI)": ["Amoxicillin", "Azithromycin (depending on cause)"],
    "Diarrheal Diseases": ["ORS (Oral Rehydration Salts)", "Zinc supplements", "Metronidazole (for specific infections)"],
    "Influenza": ["Oseltamivir", "Zanamivir"],
    "Measles": ["No specific antiviral medication (supportive care, vitamin A)"],
    "Mumps": ["No specific antiviral medication (supportive care)"],
    "Rubella": ["No specific antiviral medication (supportive care)"],
    "Polio (Post-Polio Syndrome)": ["No specific antiviral medication (supportive care, physiotherapy)"],
    "Swine Flu (H1N1)": ["Oseltamivir", "Zanamivir"],
    "Hand, Foot, and Mouth Disease": ["No specific antiviral medication (supportive care)"],
    "Zika Virus": ["No specific antiviral medication (supportive care)"],
    "Rickettsial Infections": ["Doxycycline", "Chloramphenicol"],
    "Scrub Typhus": ["Doxycycline", "Azithromycin"],
    "Severe Acute Respiratory Syndrome (SARS)": ["No specific antiviral medication (supportive care)"],
    "Yellow Fever": ["No specific antiviral medication (supportive care)"],
    "Chronic Obstructive Pulmonary Disease (COPD)": ["Bronchodilators", "Corticosteroids"],
    "Asthma": ["Inhaled corticosteroids", "Bronchodilators"],
    "Hypertension (High Blood Pressure)": ["Lisinopril", "Amlodipine", "Hydrochlorothiazide"],
    "Coronary Artery Disease (Heart Disease)": ["Aspirin", "Atorvastatin", "Nitroglycerin"],
    "Diabetes Mellitus Type 2": ["Metformin", "Insulin", "Glimepiride"],
    "Cervical Cancer": ["Cisplatin", "Paclitaxel (chemotherapy)", "Radiation therapy"],
    "Breast Cancer": ["Tamoxifen", "Trastuzumab", "Doxorubicin"],
    "Oral Cancer": ["Cisplatin", "Fluorouracil", "Radiation therapy"],
    "Lung Cancer": ["Cisplatin", "Paclitaxel", "Pembrolizumab"],
    "Stomach Cancer": ["Cisplatin", "Capecitabine", "Trastuzumab"],
    "Liver Cancer": ["Sorafenib", "Lenvatinib"],
    "Kidney Disease": ["Lisinopril", "Losartan (for managing blood pressure)", "Dialysis (for end-stage kidney disease)"],
    "Anemia": ["Ferrous sulfate", "Folic acid", "Vitamin B12"],
    "Sickle Cell Anemia": ["Hydroxyurea", "Blood transfusions"],
    "Thalassemia": ["Blood transfusions", "Iron chelation therapy"],
    "Hypothyroidism": ["Levothyroxine"],
    "Hyperthyroidism": ["Methimazole", "Propylthiouracil"],
    "Rheumatic Heart Disease": ["Penicillin", "Aspirin (for managing inflammation)"],
    "Rheumatoid Arthritis": ["Methotrexate", "Infliximab", "Adalimumab"],
    "Osteoarthritis": ["Acetaminophen", "Ibuprofen", "Glucosamine"],
    "Gout": ["Allopurinol", "Colchicine"],
    "Psoriasis": ["Methotrexate", "Infliximab", "Topical corticosteroids"],
    "Lupus": ["Hydroxychloroquine", "Prednisone"],
    "Vitiligo": ["Topical corticosteroids", "Tacrolimus"],
    "Pneumonia": ["Amoxicillin", "Azithromycin"],
    "Bronchitis": ["Amoxicillin", "Azithromycin (if bacterial)"],
    "Gastroesophageal Reflux Disease (GERD)": ["Omeprazole", "Ranitidine"],
    "Peptic Ulcer Disease": ["Omeprazole", "Clarithromycin", "Amoxicillin (for H. pylori infection)"],
    "Irritable Bowel Syndrome (IBS)": ["Loperamide", "Linaclotide"],
    "Inflammatory Bowel Disease (IBD)": ["Mesalamine", "Infliximab"],
    "Celiac Disease": ["Gluten-free diet (no specific medication)"],
    "Chronic Liver Disease (Cirrhosis)": ["Lactulose", "Spironolactone"],
    "Gallbladder Disease": ["Ursodeoxycholic acid"],
    "Chronic Kidney Disease (CKD)": ["Lisinopril", "Losartan (for managing blood pressure)", "Dialysis (for end-stage kidney disease)"],
    "Kidney Stones": ["Pain relievers", "Tamsulosin (to help pass stones)"],
    "Urinary Tract Infection (UTI)": ["Trimethoprim/Sulfamethoxazole", "Nitrofurantoin"],
    "Prostate Cancer": ["Leuprolide", "Flutamide"],
    "Bladder Cancer": ["Cisplatin", "Gemcitabine"],
    "Erectile Dysfunction": ["Sildenafil", "Tadalafil"],
    "Benign Prostatic Hyperplasia (BPH)": ["Tamsulosin", "Finasteride"],
    "Polycystic Ovary Syndrome (PCOS)": ["Metformin", "Oral contraceptives"],
    "Endometriosis": ["Leuprolide", "Oral contraceptives"],
    "Uterine Fibroids": ["Leuprolide", "Tranexamic acid"],
    "Menstrual Disorders": ["Oral contraceptives", "NSAIDs"],
    "Pelvic Inflammatory Disease (PID)": ["Doxycycline", "Ceftriaxone"],
    "Sexually Transmitted Infections (STIs)": ["Azithromycin", "Ceftriaxone (depending on infection)"],
    "Depression": ["Fluoxetine", "Sertraline"],
    "Anxiety Disorders": ["Diazepam", "Sertraline"],
    "Bipolar Disorder": ["Lithium", "Valproate"],
    "Schizophrenia": ["Risperidone", "Olanzapine"],
    "Obsessive-Compulsive Disorder (OCD)": ["Fluoxetine", "Sertraline"],
    "Post-Traumatic Stress Disorder (PTSD)": ["Sertraline", "Paroxetine"],
    "Attention-Deficit/Hyperactivity Disorder (ADHD)": ["Methylphenidate", "Amphetamine"],
    "Autism Spectrum Disorder (ASD)": ["Risperidone (for irritability)"],
    # "Alzheimers\'s Disease": ["Donepezil", "Memantine"],
    # "Parkinson\'s Disease": ["Levodopa", "Carbidopa"],
    "Epilepsy": ["Phenytoin", "Valproate"],
    "Migraine": ["Sumatriptan", "Propranolol"],
    "Dyslexia": ["No specific medication (supportive therapies)"],
    # "Huntington\'s Disease": ["Tetrabenazine", "Antipsychotics"],
    "Multiple Sclerosis (MS)": ["Interferon beta", "Glatiramer acetate"],
    "Amyotrophic Lateral Sclerosis (ALS)": ["Riluzole", "Edaravone"],
    "Cerebral Palsy": ["Baclofen", "Botulinum toxin"],
    "Muscular Dystrophy": ["Corticosteroids (Prednisone)"],
    "Myasthenia Gravis": ["Pyridostigmine", "Prednisone"],
    "Guillain-Barre Syndrome": ["Intravenous immunoglobulin (IVIG)", "Plasmapheresis"],
    "Hemophilia": ["Factor VIII or IX replacement therapy"],
    "Von Willebrand Disease": ["Desmopressin", "Factor VIII replacement"],
    "Lymphatic Filariasis (Elephantiasis)": ["Diethylcarbamazine", "Ivermectin"],
    "Systemic Lupus Erythematosus (SLE)": ["Hydroxychloroquine", "Prednisone"],
    "Autoimmune Disorders": ["Varies widely by specific disorder; common treatments include corticosteroids", "immunosuppressants"]
}

def generate_cypher_query(diseases_and_medications):
    cypher_query = ""
    for disease, medications in diseases_and_medications.items():
     for index, medication in enumerate(medications):
        # Generate the Cypher query for the current disease and medication
        cypher_query = (
            f"MATCH (d:Disease {{name: '{disease}'}})\n"
            f"MERGE (med{index}:Medication {{name: '{medication}'}})\n"
            f"WITH d, med{index}\n"
            f"MERGE (d)-[:TREATS]->(med{index})\n"
        )
        # Execute the Cypher query
        result = execute_query(uri, username, password, cypher_query)
        print(f"Query executed for {disease} and {medication}")

def execute_query(uri, username, password, query):
    with GraphDatabase.driver(uri, auth=(username, password)) as driver:
        with driver.session() as session:
            result = session.run(query)
            return result

cypher_query = generate_cypher_query(diseases_and_medications)





print("Query executed successfully.")


