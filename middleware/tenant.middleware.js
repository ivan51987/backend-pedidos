exports.tenantMiddleware = (req, res, next) => {
    const tenantId = req.headers['x-tenant-id'];
  
    if (!tenantId) {
      return res.status(400).json({ error: 'Se requiere x-tenant-id' });
    }
  
    req.tenantId = tenantId;
    next();
  };
  