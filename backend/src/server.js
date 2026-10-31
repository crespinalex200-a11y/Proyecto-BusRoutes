
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database.js";

import rutasRoutes from "./routes/rutas.routes.js";
import authRoutes from "./routes/auth.routes.js";

import Usuario from "./models/usuario.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares generales
app.use(cors());
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
  res.json({
    mensaje: "Backend de BusRoutes funcionando correctamente",
  });
});

// Rutas de la API
app.use("/api/rutas", rutasRoutes);
app.use("/api/auth", authRoutes);

// Iniciar servidor y comprobar conexión con MySQL
async function iniciarServidor() {
  try {
    await sequelize.authenticate();
    console.log("Conexión con MySQL exitosa");

    app.listen(PORT, () => {
      console.log(
        `Servidor ejecutándose en http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error.message);
    process.exit(1);
  }
}

iniciarServidor();
