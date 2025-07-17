const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Backend Multitenant de Pedidos',
    version: '1.0.0',
    description: 'Documentación de la API del sistema de pedidos multitenant',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor local'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  security: [{ bearerAuth: [] }],
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ['./routes/*.js', './docs/swagger.yaml'], 
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;
