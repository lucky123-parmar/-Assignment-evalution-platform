const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Simple test server is working!');
});

app.listen(3001, () => {
  console.log('Simple test server running on port 3001');
}); 