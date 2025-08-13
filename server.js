require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const { errorHandler } = require('./middelware/errorHandler');


const app = express();
connectDB

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

// Middleware d'erreurs - toujours à la fin
app.use(errorHandler)

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`🚀 Serveur démarré sur le port ${PORT}`));
