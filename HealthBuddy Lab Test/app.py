import streamlit as st 
import pickle 
import os
from streamlit_option_menu import option_menu

# Set Streamlit page configuration
st.set_page_config(page_title="HealthBuddy Disease Prediction", layout="wide", page_icon="🔬")

# Get the working directory
working_dir = os.path.dirname(os.path.abspath(__file__))

# Load models with error handling
try:
    with open(os.path.join(working_dir, 'saved_models', 'diabetes.pkl'), 'rb') as file:
        diabetes_model = pickle.load(file)
    with open(os.path.join(working_dir, 'saved_models', 'heart.pkl'), 'rb') as file:
        heart_disease_model = pickle.load(file)
    with open(os.path.join(working_dir, 'saved_models', 'kidney.pkl'), 'rb') as file:
        kidney_disease_model = pickle.load(file)
    with open(os.path.join(working_dir, 'saved_models', 'liver.pkl'), 'rb') as file:
        liver_disease_model = pickle.load(file)
except FileNotFoundError as e:
    st.error(f"Model file not found: {e}")
    st.stop()
except ModuleNotFoundError as e:
    st.error(f"Required module not found: {e}")
    st.stop()
except Exception as e:
    st.error(f"An error occurred while loading the model: {e}")
    st.stop()

# Initialize variables for BMI, Insulin, and Glucose categories
NewBMI_Overweight = 0
NewBMI_Underweight = 0
NewBMI_Obesity_1 = 0
NewBMI_Obesity_2 = 0 
NewBMI_Obesity_3 = 0
NewInsulinScore_Normal = 0 
NewGlucose_Low = 0
NewGlucose_Normal = 0 
NewGlucose_Overweight = 0
NewGlucose_Secret = 0

# Sidebar menu
with st.sidebar:
    selected = option_menu("HealthBuddy Disease Prediction", 
                ['Diabetes Prediction', 'Heart Disease Prediction', 'Kidney Disease Prediction', 'Liver Disease Prediction'],
                menu_icon='hospital-fill', icons=['activity', 'heart', 'person', 'heart'], default_index=0)
    
# Diabetes Prediction
if selected == 'Diabetes Prediction':
    st.title("🩸Diabetes Prediction")

    col1, col2, col3 = st.columns(3)

    with col1:
        Pregnancies = st.text_input("Number of Pregnancies", help="Enter the number of times you have been pregnant. This includes all pregnancies, regardless of the outcome (e.g., 1, 2, 3).",placeholder="0")
    with col2:
        Glucose = st.text_input("Glucose Level", help="Enter your glucose level in mg/dL.",placeholder="i.e. 140")
    with col3:
        BloodPressure = st.text_input("Blood Pressure Value", help="Enter your blood pressure value in mmHg.",placeholder="i.e. 80")
    with col1:
        SkinThickness = st.text_input("Skin Thickness Value", help="Enter the skin thickness value in mm.",placeholder="i.e. 35")
    with col2:
        Insulin = st.text_input("Insulin Value", help="Enter your insulin level in IU/mL.",placeholder="i.e. 175")
    with col3:
        BMI = st.text_input("BMI Value", help="Enter your Body Mass Index (BMI) value.", placeholder="i.e. 33.6")
    with col1:
        DiabetesPedigreeFunction = st.text_input("Diabetes Pedigree Function Value", help="Enter the diabetes pedigree function value, a measure of genetic influence.", placeholder="i.e. 0.627")
    with col2:
        Age = st.text_input("Age", help="Enter your age in years.", placeholder="i.e. 50")

    diabetes_result = ""
    if st.button("Diabetes Test Result"):
        try:
            # Process BMI
            if float(BMI) <= 18.5:
                NewBMI_Underweight = 1
            elif 18.5 < float(BMI) <= 24.9:
                pass
            elif 24.9 < float(BMI) <= 29.9:
                NewBMI_Overweight = 1
            elif 29.9 < float(BMI) <= 34.9:
                NewBMI_Obesity_1 = 1
            elif 34.9 < float(BMI) <= 39.9:
                NewBMI_Obesity_2 = 1
            elif float(BMI) > 39.9:
                NewBMI_Obesity_3 = 1

            # Process Insulin
            if 16 <= float(Insulin) <= 166:
                NewInsulinScore_Normal = 1

            # Process Glucose
            if float(Glucose) <= 70:
                NewGlucose_Low = 1
            elif 70 < float(Glucose) <= 99:
                NewGlucose_Normal = 1
            elif 99 < float(Glucose) <= 126:
                NewGlucose_Overweight = 1
            elif float(Glucose) > 126:
                NewGlucose_Secret = 1

            # Prepare user input
            user_input = [
                Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin,
                BMI, DiabetesPedigreeFunction, Age, NewBMI_Underweight,
                NewBMI_Overweight, NewBMI_Obesity_1, NewBMI_Obesity_2,
                NewBMI_Obesity_3, NewInsulinScore_Normal, NewGlucose_Low,
                NewGlucose_Normal, NewGlucose_Overweight, NewGlucose_Secret
            ]
            user_input = [float(x) for x in user_input]

            # Make prediction
            prediction = diabetes_model.predict([user_input])
            if prediction[0] == 1:
                diabetes_result = "The person has diabetes"
            else:
                diabetes_result = "The person does not have diabetes"
        except ValueError:
            st.error("Please enter valid input values.")
        st.success(diabetes_result)

# Heart Disease Prediction
if selected == 'Heart Disease Prediction':
    st.title("🫀Heart Disease Prediction")
    col1, col2, col3 = st.columns(3)

    with col1:
        age = st.text_input("Age", help="Enter your age in years.", placeholder="i.e. 50")
    with col2:
        sex = st.text_input("Sex", help="Enter your sex (e.g., male = 1, female = 0).", placeholder="i.e. 1 for male and 0 for female")
    with col3:
        cp = st.text_input("Chest Pain Types", help="Enter the type of chest pain experienced (e.g., 1 for typical angina, 2 for atypical angina, 3 for non-anginal pain, 4 for asymptomatic).", placeholder="i.e. 1 for typical angina, 2 for atypical angina")
    with col1:
        trestbps = st.text_input("Resting Blood Pressure", help="Enter your resting blood pressure in mmHg.", placeholder="i.e. 120")
    with col2:
        chol = st.text_input("Serum Cholesterol in mg/dL", help="Enter your serum cholesterol level in mg/dL.", placeholder="i.e. 200")
    with col3:
        fbs = st.text_input("Fasting Blood Sugar > 120 mg/dL", help="Enter 1 if your fasting blood sugar is greater than 120 mg/dL, otherwise enter 0.", placeholder="i.e. 1 for greater than 120 mg/dL, 0 for less than or equal to 120 mg/dL")
    with col1:
        restecg = st.text_input("Resting Electrocardiographic results", help="Enter your resting electrocardiographic results (e.g., 0 for normal, 1 for having ST-T wave abnormality, 2 for left ventricular hypertrophy).", placeholder="i.e. 0 for normal, 1 for having ST-T wave abnormality, 2 for left ventricular hypertrophy")
    with col2:
        thalach = st.text_input("Maximum Heart Rate achieved", help="Enter your maximum heart rate achieved during exercise.", placeholder="i.e. 150")
    with col3:
        exang = st.text_input("Exercise Induced Angina", help="Enter 1 if you have exercise induced angina, otherwise enter 0.", placeholder="i.e. 1 for exercise induced angina, 0 for no exercise induced angina")
    with col1:
        oldpeak = st.text_input("ST depression induced by exercise", help="Enter the ST depression induced by exercise relative to rest.", placeholder="i.e. 2.3")
    with col2:
        slope = st.text_input("Slope of the peak exercise ST segment", help="Enter the slope of the peak exercise ST segment (e.g., 1 for upsloping, 2 for flat, 3 for downsloping).", placeholder="i.e. 1 for upsloping, 2 for flat, 3 for downsloping")
    with col3:
        ca = st.text_input("Major vessels colored by fluoroscopy", help="Enter the number of major vessels colored by fluoroscopy (0-3).", placeholder="i.e. 0")
    with col1:
        thal = st.text_input("Thal", help="Enter the thalassemia result (0 for normal, 1 for fixed defect, 2 for reversible defect).", placeholder="i.e. 0 for normal, 1 for fixed defect, 2 for reversible defect")

    heart_disease_result = ""
    if st.button("Heart Disease Test Result"):
        try:
            user_input = [age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal]
            user_input = [float(x) for x in user_input]
            prediction = heart_disease_model.predict([user_input])
            if prediction[0] == 1:
                heart_disease_result = "This person has heart disease"
            else:
                heart_disease_result = "This person does not have heart disease"
        except ValueError:
            st.error("Please enter valid input values.")
        st.success(heart_disease_result)

# Kidney Disease Prediction
if selected == 'Kidney Disease Prediction':
    st.title("🫘Kidney Disease Prediction")

    col1, col2, col3, col4, col5 = st.columns(5)

    with col1:
        age = st.text_input("Age", help="Enter your age in years.", placeholder="i.e. 50")
    with col2:
        blood_pressure = st.text_input("Blood Pressure", help="Enter your blood pressure value in mmHg.", placeholder="i.e. 120")
    with col3:
        specific_gravity = st.text_input("Specific Gravity", help="Enter the specific gravity of your urine (e.g., 1.005, 1.010, 1.015, 1.020, 1.025).", placeholder="i.e. 1.005")
    with col4:
        albumin = st.text_input("Albumin", help="Enter the albumin level in your urine (e.g., 0, 1, 2, 3, 4, 5).", placeholder="i.e. 0")
    with col5:
        sugar = st.text_input("Sugar", help="Enter the sugar level in your urine (e.g., 0, 1, 2, 3, 4, 5).", placeholder="i.e. 0")
    with col1:
        red_blood_cells = st.text_input("Red Blood Cells", help="Enter the presence of red blood cells in your urine (e.g., normal, abnormal).", placeholder="i.e. normal")
    with col2:
        pus_cell = st.text_input("Pus Cell", help="Enter the presence of pus cells in your urine (e.g., normal, abnormal).", placeholder="i.e. normal")
    with col3:
        pus_cell_clumps = st.text_input("Pus Cell Clumps", help="Enter the presence of pus cell clumps in your urine (e.g., present, not present).", placeholder="i.e. present")
    with col4:
        bacteria = st.text_input("Bacteria", help="Enter the presence of bacteria in your urine (e.g., present, not present).", placeholder="i.e. present")
    with col5:
        blood_glucose_random = st.text_input("Blood Glucose Random", help="Enter your random blood glucose level in mg/dL.", placeholder="i.e. 100")
    with col1:
        blood_urea = st.text_input("Blood Urea", help="Enter your blood urea level in mg/dL.", placeholder="i.e. 50")
    with col2:
        serum_creatinine = st.text_input("Serum Creatinine", help="Enter your serum creatinine level in mg/dL.", placeholder="i.e. 1.5")
    with col3:
        sodium = st.text_input("Sodium", help="Enter your sodium level in mEq/L.", placeholder="i.e. 145")
    with col4:
        potassium = st.text_input("Potassium", help="Enter your potassium level in mEq/L.", placeholder="i.e. 4.5")
    with col5:
        haemoglobin = st.text_input("Haemoglobin", help="Enter your haemoglobin level in g/dL.", placeholder="i.e. 15.5")
    with col1:
        packed_cell_volume = st.text_input("Packed Cell Volume", help="Enter your packed cell volume as a percentage.", placeholder="i.e. 45")
    with col2:
        white_blood_cell_count = st.text_input("White Blood Cell Count", help="Enter your white blood cell count in cells/cumm.", placeholder="i.e. 6000")
    with col3:
        red_blood_cell_count = st.text_input("Red Blood Cell Count", help="Enter your red blood cell count in millions/cmm.", placeholder="i.e. 4.5")
    with col4:
        hypertension = st.text_input("Hypertension", help="Enter 1 if you have hypertension, otherwise enter 0.", placeholder="i.e. 1")
    with col5:
        diabetes_mellitus = st.text_input("Diabetes Mellitus", help="Enter 1 if you have diabetes mellitus, otherwise enter 0.", placeholder="i.e. 1")
    with col1:
        coronary_artery_disease = st.text_input("Coronary Artery Disease", help="Enter 1 if you have coronary artery disease, otherwise enter 0.", placeholder="i.e. 1")
    with col2:
        appetite = st.text_input("Appetite", help="Enter your appetite status (e.g., good, poor).", placeholder="i.e. good")
    with col3:
        peda_edema = st.text_input("Pedal Edema", help="Enter 1 if you have pedal edema, otherwise enter 0.", placeholder="i.e. 1")
    with col4:
        aanemia = st.text_input("Anemia", help="Enter 1 if you have anemia, otherwise enter 0.", placeholder="i.e. 1")

    kidney_disease_result = ''
    if st.button("Kidney's Test Result"):
        try:
            user_input = [
                age, blood_pressure, specific_gravity, albumin, sugar,
                red_blood_cells, pus_cell, pus_cell_clumps, bacteria,
                blood_glucose_random, blood_urea, serum_creatinine, sodium,
                potassium, haemoglobin, packed_cell_volume,
                white_blood_cell_count, red_blood_cell_count, hypertension,
                diabetes_mellitus, coronary_artery_disease, appetite,
                peda_edema, aanemia
            ]
            user_input = [float(x) for x in user_input]
            prediction = kidney_disease_model.predict([user_input])
            if prediction[0] == 1:
                kidney_disease_result = "The person has kidney disease"
            else:
                kidney_disease_result = "The person does not have kidney disease"
        except ValueError:
            st.error("Please enter valid input values.")
        st.success(kidney_disease_result)



# Liver Disease Prediction
if selected == 'Liver Disease Prediction':
    st.title("⚕️Liver Disease Prediction")

    col1, col2, col3, col4, col5 = st.columns(5)

    with col1:
        Age = st.text_input("Age", help="Enter your age in years.", placeholder="i.e. 50")
    with col2:
        Gender = st.text_input("Gender", help="Enter your gender (e.g., male, female).", )
    with col3:
        Total_Bilirubin = st.text_input("Total Bilirubin", help="Enter your total bilirubin level in mg/dL.", placeholder="i.e. 0.5")
    with col4:
        Direct_Bilirubin = st.text_input("Direct Bilirubin", help="Enter your direct bilirubin level in mg/dL.", placeholder="i.e. 0.1")
    with col5:
        Alkaline_Phosphotase = st.text_input("Alkaline Phosphotase", help="Enter your alkaline phosphotase level in IU/L.", placeholder="i.e. 100")
    with col1:
        Alamine_Aminotransferase = st.text_input("Alamine Aminotransferase", help="Enter your alamine aminotransferase level in IU/L.", placeholder="i.e. 50")
    with col2:
        Aspartate_Aminotransferase = st.text_input("Aspartate Aminotransferase", help="Enter your aspartate aminotransferase level in IU/L.", placeholder="i.e. 20")
    with col3:
        Total_Protiens = st.text_input("Total Proteins", help="Enter your total proteins level in g/dL.", placeholder="i.e. 5")
    with col4:
        Albumin = st.text_input("Albumin", help="Enter your albumin level in g/dL.", placeholder="i.e. 3, 4.5, 6")
    with col5:
        Albumin_and_Globulin_Ratio = st.text_input("Albumin and Globulin Ratio", help="Enter your albumin and globulin ratio.", placeholder="i.e. 0.9")

    print(type(liver_disease_model))

    liver_disease_result = ''
    if st.button("Liver's Test Result"):
        try:
            user_input = [
                Gender,Total_Bilirubin,Direct_Bilirubin,Alkaline_Phosphotase,Alamine_Aminotransferase,Aspartate_Aminotransferase,Total_Protiens,Albumin,Albumin_and_Globulin_Ratio
            ]
            user_input = [float(x) for x in user_input]
            prediction = liver_disease_model.predict([user_input])
            if prediction[0] == 1:
                liver_disease_result = "The person has liver disease"
            else:
                liver_disease_result = "The person does not have liver disease"
        except ValueError:
            st.error("Please enter valid input values.")
        st.success(liver_disease_result)
