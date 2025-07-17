const Producto = require('../models/producto.model');

exports.crearProducto = async (tenantId, productoData) => {
  console.log(tenantId, productoData);
  
  return await Producto.create({
    ...productoData,
    tenantId
  });
};

exports.listarProductos = async (tenantId) => {
  return await Producto.find({ tenantId })
    .sort({ nombre: 1 });
};

exports.eliminarProducto = async (tenantId, productoId) => {
  const producto = await Producto.findOne({ _id: productoId, tenantId });
  if (!producto) {
    throw new Error('Producto no encontrado');
  }

  await producto.remove();
};