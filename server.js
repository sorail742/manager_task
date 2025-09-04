require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorHandler');
const cors = require('cors')
const app = express();
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use(cors({}));

// Middleware d'erreurs - toujours à la fin
app.use(errorHandler);

const PORT = process.env.PORT || 5002;
connectDB.then(() => {
	app.listen(PORT, () => console.log(`🚀 Serveur démarré sur le port ${PORT}`));
});
