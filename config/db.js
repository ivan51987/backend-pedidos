const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('[MongoDB] Conectado correctamente');
  } catch (err) {
    console.error('[MongoDB] Error de conexión:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
