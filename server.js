const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

const PLANS_FILE = path.join(__dirname, 'plans.json');
const ACTIVATIONS_FILE = path.join(__dirname, 'activations.json');

// Get all plans
app.get('/api/plans', (req, res) => {
  fs.readFile(PLANS_FILE, (err, data) => {
    if (err) {
      console.error("Error reading plans file:", err);
      res.status(500).send("Error reading plans file");
    } else {
      res.json(JSON.parse(data));
    }
  });
});

// Activate a plan
app.post('/api/activate', (req, res) => {
  const { planId, start, end } = req.body;
  const newActivation = { planId, start, end };

  // Read the existing activations
  fs.readFile(ACTIVATIONS_FILE, (err, data) => {
    if (err) {
      console.error("Error reading activations file:", err);
      res.status(500).send("Error reading activations file");
      return;
    }

    let activations;
    try {
      activations = JSON.parse(data);
    } catch (parseError) {
      console.error("Error parsing activations file:", parseError);
      res.status(500).send("Error parsing activations file");
      return;
    }

    // Add the new activation
    activations.push(newActivation);

    // Write the updated activations back to the file
    fs.writeFile(ACTIVATIONS_FILE, JSON.stringify(activations, null, 2), (writeErr) => {
      if (writeErr) {
        console.error("Error writing to activations file:", writeErr);
        res.status(500).send("Error writing to activations file");
      } else {
        res.status(200).send('Activation recorded');
      }
    });
  });
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
