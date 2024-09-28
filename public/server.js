const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files like your HTML, CSS, and JS files
app.use(express.static(path.join(__dirname)));

// Default route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'tutors.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
