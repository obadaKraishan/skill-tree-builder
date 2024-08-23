const express = require('express');
const apiRoutes = require('./api');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Enable CORS
app.use(cors());

app.use(express.json());
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
