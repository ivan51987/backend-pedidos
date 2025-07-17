const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      uid: decoded.uid,
      tenantId: decoded.tenantId,
      role: decoded.role
    };
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
};
