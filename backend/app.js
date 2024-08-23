const express = require('express');
const apiRoutes = require('./api'); // Import the api/index.js

const app = express();

// Use the API routes
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
