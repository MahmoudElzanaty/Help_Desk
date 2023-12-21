import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib
import json
# Read the data
df = pd.read_csv('generatedDataset.csv')

# One-hot encode 'Priority' and 'Type'
df = pd.get_dummies(df, columns=['Priority', 'Type'], prefix=['Priority', 'Type'])

# Define features and target
X = df.drop(['Agent'], axis=1)
y = df['Agent']

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
rfc = RandomForestClassifier(n_estimators=100, random_state=42)
model = rfc.fit(X_train, y_train)

# Predictions
y_pred = rfc.predict(X_test)

# Model evaluation
accuracy = accuracy_score(y_test, y_pred)
print("Accuracy: %.2f%%" % (accuracy * 100.0))

# Additional metrics
print("Classification Report:")
print(classification_report(y_test, y_pred))

# Predict probability for a new example
new_example = pd.DataFrame({'Priority_high': [0], 'Priority_medium': [1], 'Priority_low': [0],
                            'Type_hardware': [0], 'Type_network': [0], 'Type_software': [1]})

# Ensure the order of columns matches the order during training
new_example = new_example[X.columns]

print("Predicted probabilities for [Priority=medium, Type=software]:")
print(rfc.predict_proba(new_example))

# Save the model
joblib.dump(model, 'model.joblib')



loaded_model = joblib.load('model.joblib')

# Convert the model parameters to a dictionary
model_params = loaded_model.get_params()

# Save the model parameters as JSON
with open('model_params.json', 'w') as json_file:
    json.dump(model_params, json_file)

# To use the model parameters later, you can load them back from the JSON file
with open('model_params.json', 'r') as json_file:
    loaded_params = json.load(json_file)

# Create a new model using the loaded parameters
new_model = RandomForestClassifier(**loaded_params)
