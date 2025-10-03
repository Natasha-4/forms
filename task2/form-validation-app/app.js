const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Temporary in-memory storage
const submissions = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/submit', (req, res) => {
  const { name, email, age, gender } = req.body;

  // Server-side validation
  if (!name || !email || !age || !gender) {
    return res.send("Error: All fields are required.");
  }

  if (isNaN(age) || age < 1 || age > 120) {
    return res.send("Error: Age must be between 1 and 120.");
  }

  // Store in memory
  submissions.push({ name, email, age, gender });

  res.render('result', { name, email, age, gender });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});