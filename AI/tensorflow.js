const tf = require('@tensorflow/tfjs-node');

async function loadModelAndPredict() {
    // Load the model
    const model = await tf.loadLayersModel('model_params.json');

    // Create input data (replace these values with your actual input)
    const inputData = tf.tensor2d([[1.0, 2.0, 3.0]]);

    // Make predictions
    const prediction = model.predict(inputData);

    // Print the prediction
    prediction.print();
}

// Call the asynchronous function
loadModelAndPredict().catch(error => console.error(error));
