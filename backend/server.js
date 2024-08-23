const express = require('express');
const skillTreeRoutes = require('./routes/skillTreeRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Enable CORS
app.use(cors());

app.use(express.json());
app.use('/api', skillTreeRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
