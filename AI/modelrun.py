# your_python_script.py

import joblib
import pandas as pd

# Load your joblib model
model = joblib.load('model.joblib')

# Function to make predictions
def make_predictions(input_data):
    # Assuming 'Priority', 'Type', 'Agent' are categorical columns
    input_data_encoded = pd.get_dummies(input_data, columns=['Priority', 'Type'])
    
    # Make sure 'Agent' values are encoded consistently
    input_data_encoded['Agent'] = input_data['Agent']

    predictions = model.predict(input_data_encoded)
    return predictions

if __name__ == "__main__":
    # Read input data from a CSV-like format
    input_data = pd.read_csv('testdata.csv')

    # Make predictions
    result = make_predictions(input_data)

    # Save the result to a file or print it
    with open('predictions.txt', 'w') as f:
        f.write(str(result))
