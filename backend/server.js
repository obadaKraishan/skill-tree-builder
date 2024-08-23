const express = require('express');
const cors = require('cors');
const skillTreeRoutes = require('./routes/skillTreeRoutes');
require('dotenv').config();

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(express.json());
app.use('/api', skillTreeRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
