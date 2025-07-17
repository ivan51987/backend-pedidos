// Funciones de ayuda generales
exports.calcularTotalPedido = (items) => {
    return items.reduce((total, item) => total + (item.cantidad * item.precioUnitario), 0);
  };
  
  exports.formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };