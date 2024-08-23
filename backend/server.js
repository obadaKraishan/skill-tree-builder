const express = require('express');
const skillTreeRoutes = require('./routes/skillTreeRoutes');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/api', skillTreeRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
