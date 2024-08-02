

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

// Serve static files (if needed)
app.use(express.static(path.join(__dirname, 'reactDev\employee_manager\Server\db.json')));

// Define a route handler for the root URL
app.get('/', (req, res) => {
  // Send a response indicating that the server is running
  res.send('Server is running');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
