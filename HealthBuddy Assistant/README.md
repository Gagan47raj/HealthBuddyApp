# HealthBuddy

HealthBuddy is a Flask web application that helps users identify potential health issues based on their symptoms. By leveraging a machine learning model named HealthBuddy, the app provides users with relevant medications, workout routines, diet plans, precautions, and possible disease names.

## Features

- **Symptom Input**: Users can input symptoms such as itching, cough, body pain, etc.
- **ML Model Integration**: HealthBuddy ML model processes the symptoms and returns potential diagnoses.
- **Personalized Advice**: Provides medication, workout routines, diet plans, and precautions based on the diagnosis.
- **User-Friendly Interface**: Intuitive and responsive web interface for easy interaction.

## Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/gagan47raj/HealthBuddy-Assistant.git
    cd HealthBuddy
    ```

2. **Create a virtual environment**:
    ```sh
    python3 -m venv venv
    ```

3. **Activate the virtual environment**:
    - On Windows:
        ```sh
        venv\Scripts\activate
        ```
    - On macOS/Linux:
        ```sh
        source venv/bin/activate
        ```

4. **Install dependencies**:
    ```sh
    pip install -r requirements.txt
    ```

5. **Run the Flask app**:
    ```sh
    flask run
    ```

6. **Navigate to the application**:
    Open your web browser and go to `http://127.0.0.1:5000`.

## Usage

1. **Input Symptoms**: Enter your symptoms in the provided form.
2. **Get Diagnosis**: The HealthBuddy ML model will analyze the symptoms and provide potential diagnoses.
3. **Receive Recommendations**: Based on the diagnosis, the app will provide relevant medications, workout routines, diet plans, and precautions.

## File Structure

```
HealthBuddy/
│
├── app.py                   # Main Flask application
├── model/                   # Directory for the ML model
│   └── healthbuddy_model.pkl # Serialized machine learning model
├── static/                  # Static files (CSS, JavaScript, images)
├── templates/               # HTML templates
│   └── index.html           # Main application template
├── requirements.txt         # List of Python dependencies
└── README.md                # Project documentation
```

## Model Training

To retrain or update the HealthBuddy ML model:

1. **Prepare your dataset**: Ensure it includes labeled data with symptoms and corresponding diagnoses.
2. **Train the model**:
    ```sh
    python train_model.py
    ```
3. **Update the model in the app**: Replace the `healthbuddy_model.pkl` file in the `model/` directory with the newly trained model.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the Apache License. See the [LICENSE](LICENSE) file for details.

## Contact

For any queries or issues, please contact:

- **Gagan Rajput**

- **Email**: gagan20rajput@gmail.com

---

Thank you for using HealthBuddy! Stay healthy and informed.
