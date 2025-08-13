const mongoose = require('mongoose');

const connectDB = mongoose.connect(process.env.MONGO_URI)
                        .then(()=> console.log('connecté à mongodb'))
                        .catch((err)=> console.error('erreur de connexion à mongodb', err));
module.exports = connectDB