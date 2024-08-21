const express = require('express');
const connectDB = require('./config/db');
const skillTreeRoutes = require('./routes/skillTreeRoutes');

const app = express();
connectDB();

app.use(express.json());
app.use('/api', skillTreeRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
