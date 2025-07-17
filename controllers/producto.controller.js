const productoService = require('../services/producto.service');

exports.crearProducto = async (req, res) => {
  try {
    console.log(req.user.tenantId, req.body);
    
    const producto = await productoService.crearProducto(req.user.tenantId, req.body);
    res.status(201).json(producto);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listarProductos = async (req, res) => {
  const productos = await productoService.listarProductos(req.user.tenantId);
  res.json(productos);
};

exports.eliminarProducto = async (req, res) => {
  try {
    await productoService.eliminarProducto(req.user.tenantId, req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
