const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'Token manquant' });

  const token = header.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token malformé' });
  

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET n'est pas défini !");
  }
    req.user = payload; // contient id, email, role ...
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalide' });
  }
};
