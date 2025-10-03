const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/submit', (req, res) => {
  const { username, password } = req.body;

  // Server-side validation
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  if (!username || !passwordRegex.test(password)) {
    return res.send("Error: Invalid input. Password must be 8+ chars, include uppercase, number, and symbol.");
  }

  res.render('success', { username });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});