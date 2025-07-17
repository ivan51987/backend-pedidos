exports.tenantMiddleware = (req, res, next) => {

    const tenantId = req.user.tenantId;
  
    if (!tenantId) {
      return res.status(400).json({ error: 'Se requiere tenant-id' });
    }
  
    req.tenantId = tenantId;
    next();
  };
  