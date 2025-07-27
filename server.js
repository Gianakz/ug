const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(require('cors')());

// API endpoint to receive form data
app.post('/submit', (req, res) => {
  const data = req.body;

  // Save to file (append)
  const submissionsPath = path.join(__dirname, 'submissions.json');
  let existing = [];

  if (fs.existsSync(submissionsPath)) {
    existing = JSON.parse(fs.readFileSync(submissionsPath));
  }

  existing.push(data);
  fs.writeFileSync(submissionsPath, JSON.stringify(existing, null, 2));

  res.status(200).json({ message: 'Submission received successfully!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
