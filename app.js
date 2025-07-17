require("dotenv").config();

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const connectDB = require("./config/db");
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const { errorHandler } = require("./middleware/error.middleware");
const { tenantMiddleware } = require("./middleware/tenant.middleware");
const { authMiddleware } = require("./middleware/auth.middleware");
const cors = require('cors');
const authRoutes = require("./routes/auth.routes");
const pedidoRoutes = require("./routes/pedido.routes");
const productoRoutes = require("./routes/producto.routes");
const tenantRoutes = require("./routes/tenant.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const bitacoraRoutes = require('./routes/bitacora.routes');
const app = express();
connectDB();

app.use(express.json());

app.use(helmet());


app.use(cors());

const limiter = rateLimit({
  max: 100, 
  windowMs: 60 * 60 * 1000, 
  message: "Demasiadas peticiones desde esta IP",
});

app.use("/api", limiter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", authRoutes);
app.use("/api/tenants", tenantRoutes);

app.use(authMiddleware);
//app.use(tenantMiddleware);

app.use("/api/pedidos", pedidoRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use('/api/bitacora', bitacoraRoutes);

app.use(errorHandler);

app.use(mongoSanitize());

module.exports = app;
