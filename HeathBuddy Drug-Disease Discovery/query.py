# List of diseases with symptoms
disease_symptoms = {
    "Dengue Fever": ["Fever", "Headache", "Joint Pain", "Rash"],
    "Malaria": ["Fever", "Chills", "Sweating", "Nausea"],
    "Tuberculosis (TB)": ["Cough", "Chest Pain", "Weight Loss", "Fever"],
    "Cholera": ["Diarrhea", "Dehydration", "Vomiting", "Leg Cramps"],
    "Hepatitis A": ["Fatigue", "Nausea", "Abdominal Pain", "Jaundice"],
    "Hepatitis B": ["Fatigue", "Nausea", "Abdominal Pain", "Jaundice"],
    "Hepatitis C": ["Fatigue", "Nausea", "Abdominal Pain", "Jaundice"],
    "Typhoid Fever": ["Fever", "Headache", "Abdominal Pain", "Rash"],
    "Leprosy": ["Skin Lesions", "Nerve Damage", "Weakness", "Numbness"],
    "Rabies": ["Fever", "Headache", "Nausea", "Hydrophobia"],
    "HIV/AIDS": ["Fatigue", "Weight Loss", "Fever", "Night Sweats"],
    "Chikungunya": ["Fever", "Joint Pain", "Headache", "Rash"],
    "Japanese Encephalitis": ["Fever", "Headache", "Vomiting", "Seizures"],
    "Leishmaniasis (Kala-azar)": ["Fever", "Weight Loss", "Enlarged Spleen", "Anemia"],
    "Filariasis": ["Swelling", "Fever", "Skin Lesions", "Lymph Node Enlargement"],
    "Acute Respiratory Infections (ARI)": ["Cough", "Fever", "Breathing Difficulty", "Chest Pain"],
    "Diarrheal Diseases": ["Diarrhea", "Dehydration", "Abdominal Pain", "Nausea"],
    "Influenza": ["Fever", "Cough", "Sore Throat", "Body Aches"],
    "Measles": ["Fever", "Rash", "Cough", "Conjunctivitis"],
    "Mumps": ["Fever", "Swollen Salivary Glands", "Headache", "Muscle Aches"],
    "Rubella": ["Fever", "Rash", "Swollen Lymph Nodes", "Joint Pain"],
    "Polio (Post-Polio Syndrome)": ["Weakness", "Fatigue", "Muscle Atrophy", "Joint Pain"],
    "Swine Flu (H1N1)": ["Fever", "Cough", "Sore Throat", "Body Aches"],
    "Hand, Foot, and Mouth Disease": ["Fever", "Sore Throat", "Rash", "Blisters"],
    "Zika Virus": ["Fever", "Rash", "Joint Pain", "Conjunctivitis"],
    "Rickettsial Infections": ["Fever", "Rash", "Headache", "Muscle Pain"],
    "Scrub Typhus": ["Fever", "Headache", "Rash", "Muscle Pain"],
    "Severe Acute Respiratory Syndrome (SARS)": ["Fever", "Cough", "Breathing Difficulty", "Headache"],
    "Yellow Fever": ["Fever", "Jaundice", "Bleeding", "Back Pain"],
    "Chronic Obstructive Pulmonary Disease (COPD)": ["Cough", "Shortness of Breath", "Wheezing", "Chest Tightness"],
    "Asthma": ["Cough", "Shortness of Breath", "Wheezing", "Chest Tightness"],
    "Hypertension (High Blood Pressure)": ["Headache", "Dizziness", "Nosebleeds", "Fatigue"],
    "Coronary Artery Disease (Heart Disease)": ["Chest Pain", "Shortness of Breath", "Fatigue", "Heart Attack"],
    "Diabetes Mellitus Type 2": ["Frequent Urination", "Increased Thirst", "Increased Hunger", "Fatigue"],
    "Cervical Cancer": ["Abnormal Bleeding", "Pelvic Pain", "Weight Loss", "Fatigue"],
    "Breast Cancer": ["Lump in Breast", "Nipple Discharge", "Skin Changes", "Pain"],
    "Oral Cancer": ["Mouth Sores", "Pain", "Difficulty Swallowing", "Weight Loss"],
    "Lung Cancer": ["Cough", "Chest Pain", "Weight Loss", "Shortness of Breath"],
    "Stomach Cancer": ["Abdominal Pain", "Nausea", "Weight Loss", "Loss of Appetite"],
    "Liver Cancer": ["Weight Loss", "Abdominal Pain", "Jaundice", "Nausea"],
    "Kidney Disease": ["Fatigue", "Swelling", "Urinary Changes", "Nausea"],
    "Anemia": ["Fatigue", "Pale Skin", "Shortness of Breath", "Dizziness"],
    "Sickle Cell Anemia": ["Pain Crises", "Fatigue", "Swelling", "Infections"],
    "Thalassemia": ["Fatigue", "Weakness", "Pale Skin", "Bone Deformities"],
    "Hypothyroidism": ["Fatigue", "Weight Gain", "Cold Intolerance", "Constipation"],
    "Hyperthyroidism": ["Weight Loss", "Rapid Heartbeat", "Heat Intolerance", "Anxiety"],
    "Rheumatic Heart Disease": ["Chest Pain", "Shortness of Breath", "Fatigue", "Swelling"],
    "Rheumatoid Arthritis": ["Joint Pain", "Swelling", "Stiffness", "Fatigue"],
    "Osteoarthritis": ["Joint Pain", "Stiffness", "Swelling", "Decreased Mobility"],
    "Gout": ["Joint Pain", "Swelling", "Redness", "Heat"],
    "Psoriasis": ["Red Patches", "Itching", "Scaling", "Pain"],
    "Lupus": ["Fatigue", "Joint Pain", "Skin Rash", "Fever"],
    "Vitiligo": ["White Patches", "Skin Discoloration", "Hair Color Loss", "Mucous Membrane Changes"],
    "Pneumonia": ["Cough", "Fever", "Breathing Difficulty", "Chest Pain"],
    "Bronchitis": ["Cough", "Mucus Production", "Fatigue", "Shortness of Breath"],
    "Gastroesophageal Reflux Disease (GERD)": ["Heartburn", "Regurgitation", "Chest Pain", "Difficulty Swallowing"],
    "Peptic Ulcer Disease": ["Abdominal Pain", "Bloating", "Heartburn", "Nausea"],
    "Irritable Bowel Syndrome (IBS)": ["Abdominal Pain", "Bloating", "Diarrhea", "Constipation"],
    "Inflammatory Bowel Disease (IBD)": ["Abdominal Pain", "Diarrhea", "Weight Loss", "Fatigue"],
    "Celiac Disease": ["Diarrhea", "Weight Loss", "Fatigue", "Anemia"],
    "Chronic Liver Disease (Cirrhosis)": ["Fatigue", "Jaundice", "Swelling", "Bleeding"],
    "Gallbladder Disease": ["Abdominal Pain", "Nausea", "Vomiting", "Jaundice"],
    "Chronic Kidney Disease (CKD)": ["Fatigue", "Swelling", "Urinary Changes", "Nausea"],
    "Kidney Stones": ["Severe Pain", "Blood in Urine", "Nausea", "Vomiting"],
    "Urinary Tract Infection (UTI)": ["Burning Sensation", "Frequent Urination", "Cloudy Urine", "Pelvic Pain"],
    "Prostate Cancer": ["Urinary Difficulty", "Blood in Urine", "Pelvic Pain", "Bone Pain"],
    "Bladder Cancer": ["Blood in Urine", "Painful Urination", "Pelvic Pain", "Frequent Urination"],
    "Erectile Dysfunction": ["Inability to Maintain Erection", "Reduced Libido", "Anxiety", "Stress"],
    "Benign Prostatic Hyperplasia (BPH)": ["Frequent Urination", "Weak Stream", "Urgency", "Incomplete Bladder Emptying"],
    "Polycystic Ovary Syndrome (PCOS)": ["Irregular Periods", "Excess Hair Growth", "Weight Gain", "Acne"],
    "Endometriosis": ["Pelvic Pain", "Heavy Periods", "Painful Periods", "Infertility"],
    "Uterine Fibroids": ["Heavy Periods", "Pelvic Pain", "Frequent Urination", "Constipation"],
    "Menstrual Disorders": ["Heavy Periods", "Irregular Periods", "Painful Periods", "Mood Swings"],
    "Pelvic Inflammatory Disease (PID)": ["Pelvic Pain", "Fever", "Abnormal Discharge", "Painful Urination"],
    "Sexually Transmitted Infections (STIs)": ["Genital Sores", "Discharge", "Burning Sensation", "Rash"],
    "Depression": ["Sadness", "Loss of Interest", "Fatigue", "Sleep Disturbances"],
    "Anxiety Disorders": ["Excessive Worry", "Restlessness", "Fatigue", "Difficulty Concentrating"],
    "Bipolar Disorder": ["Mood Swings", "Depression", "Mania", "Fatigue"],
    "Schizophrenia": ["Hallucinations", "Delusions", "Disorganized Thinking", "Lack of Motivation"],
    "Obsessive-Compulsive Disorder (OCD)": ["Obsessions", "Compulsions", "Anxiety", "Distress"],
    "Post-Traumatic Stress Disorder (PTSD)": ["Flashbacks", "Nightmares", "Anxiety", "Avoidance"],
    "Attention-Deficit/Hyperactivity Disorder (ADHD)": ["Inattention", "Hyperactivity", "Impulsivity", "Disorganization"],
    "Autism Spectrum Disorder (ASD)": ["Social Challenges", "Communication Difficulties", "Repetitive Behaviors", "Sensory Sensitivities"],
    "Alzheimer's Disease": ["Memory Loss", "Confusion", "Disorientation", "Behavior Changes"],
    "Parkinson's Disease": ["Tremor", "Stiffness", "Slowness of Movement", "Balance Problems"],
    "Epilepsy": ["Seizures", "Confusion", "Staring Spells", "Loss of Consciousness"],
    "Migraine": ["Severe Headache", "Nausea", "Sensitivity to Light", "Sensitivity to Sound"],
    "Dyslexia": ["Reading Difficulties", "Writing Difficulties", "Spelling Problems", "Slow Reading"],
    "Huntington's Disease": ["Movement Disorders", "Cognitive Decline", "Behavior Changes", "Depression"],
    "Multiple Sclerosis (MS)": ["Fatigue", "Vision Problems", "Numbness", "Difficulty Walking"],
    "Amyotrophic Lateral Sclerosis (ALS)": ["Muscle Weakness", "Twitching", "Difficulty Speaking", "Difficulty Swallowing"],
    "Cerebral Palsy": ["Movement Disorders", "Muscle Stiffness", "Coordination Problems", "Difficulty Walking"],
    "Muscular Dystrophy": ["Muscle Weakness", "Difficulty Walking", "Loss of Reflexes", "Breathing Problems"],
    "Myasthenia Gravis": ["Muscle Weakness", "Drooping Eyelids", "Difficulty Swallowing", "Shortness of Breath"],
    "Guillain-Barre Syndrome": ["Weakness", "Tingling", "Loss of Reflexes", "Difficulty Breathing"],
    "Hemophilia": ["Excessive Bleeding", "Bruising", "Joint Pain", "Swelling"],
    "Von Willebrand Disease": ["Nosebleeds", "Bleeding Gums", "Heavy Periods", "Bruising"],
    "Lymphatic Filariasis (Elephantiasis)": ["Swelling", "Skin Thickening", "Fever", "Pain"],
    "Systemic Lupus Erythematosus (SLE)": ["Fatigue", "Joint Pain", "Skin Rash", "Fever"],
    "Autoimmune Disorders": ["Fatigue", "Joint Pain", "Skin Rash", "Swelling"]
}

# Generate Cypher queries to create Symptom nodes and relationships
cypher_queries = []

# Create Symptom nodes
for disease, symptoms in disease_symptoms.items():
    for symptom in symptoms:
        create_symptom_query = f"MERGE (s:Symptom {{name: '{symptom}'}});"
        cypher_queries.append(create_symptom_query)

# Create relationships between Disease and Symptom nodes
for disease, symptoms in disease_symptoms.items():
    for symptom in symptoms:
        create_relationship_query = f"""
        MATCH (d:Disease {{name: '{disease}'}})
        MATCH (s:Symptom {{name: '{symptom}'}})
        MERGE (d)-[:HAS_SYMPTOM]->(s);
        """
        cypher_queries.append(create_relationship_query)

# Print all Cypher queries
for query in cypher_queries:
    print(query)
