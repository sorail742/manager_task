// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports.authenticate = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'Token manquant' });

  const token = header.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token malformé' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { id, email, role }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalide' });
  }
};

// Vérifie si l'utilisateur est admin
module.exports.authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Accès interdit : admin requis" });
  }
  next();
};
