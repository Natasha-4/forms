const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

const submissions = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/submit', (req, res) => {
  const { name, email, age, gender } = req.body;

  if (!name || !email || !age || !gender) {
    return res.send("Error: All fields are required.");
  }

  if (isNaN(age) || age < 1 || age > 120) {
    return res.send("Error: Age must be between 1 and 120.");
  }

  submissions.push({ name, email, age, gender });

  res.render('result', { name, email, age, gender });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});