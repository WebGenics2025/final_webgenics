const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from your project folder
app.use(express.static(path.join(__dirname)));

// Default route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
