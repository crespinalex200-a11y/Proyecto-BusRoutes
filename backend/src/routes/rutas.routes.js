import { Router } from "express";
import Ruta from "../models/ruta.js";
import {
  verificarToken,
  verificarAdministrador,
} from "../middlewares/auth.middleware.js";

const router = Router();

// GET: consultar todas las rutas (público)
router.get("/", async (req, res) => {
  try {
    const rutas = await Ruta.findAll({
      order: [["id", "ASC"]],
    });

    return res.json(rutas);
  } catch (error) {
    console.error("Error al consultar rutas:", error);

    return res.status(500).json({
      mensaje: "Error al consultar las rutas",
    });
  }
});

// POST: registrar una ruta (solo administrador)
router.post(
  "/",
  verificarToken,
  verificarAdministrador,
  async (req, res) => {
    try {
      const {
        code,
        name,
        origin,
        destination,
        time,
        fare,
        status,
      } = req.body;

      if (
        !code ||
        !name ||
        !origin ||
        !destination ||
        time == null ||
        fare == null ||
        !status
      ) {
        return res.status(400).json({
          mensaje: "Todos los campos son obligatorios",
        });
      }

      const nuevaRuta = await Ruta.create({
        code,
        name,
        origin,
        destination,
        time,
        fare,
        status,
      });

      return res.status(201).json({
        mensaje: "Ruta creada correctamente",
        ruta: nuevaRuta,
      });
    } catch (error) {
      console.error("Error al crear ruta:", error);

      return res.status(500).json({
        mensaje: "Error al crear la ruta",
      });
    }
  }
);

// PUT: actualizar una ruta (solo administrador)
router.put(
  "/:id",
  verificarToken,
  verificarAdministrador,
  async (req, res) => {
    try {
      const ruta = await Ruta.findByPk(req.params.id);

      if (!ruta) {
        return res.status(404).json({
          mensaje: "Ruta no encontrada",
        });
      }

      const camposPermitidos = [
        "code",
        "name",
        "origin",
        "destination",
        "time",
        "fare",
        "status",
      ];

      const cambios = {};

      for (const campo of camposPermitidos) {
        if (req.body[campo] !== undefined) {
          cambios[campo] = req.body[campo];
        }
      }

      if (Object.keys(cambios).length === 0) {
        return res.status(400).json({
          mensaje: "No se enviaron campos para actualizar",
        });
      }

      await ruta.update(cambios);

      return res.json({
        mensaje: "Ruta actualizada correctamente",
        ruta,
      });
    } catch (error) {
      console.error("Error al actualizar ruta:", error);

      return res.status(500).json({
        mensaje: "Error al actualizar la ruta",
      });
    }
  }
);

// DELETE: eliminar una ruta (solo administrador)
router.delete(
  "/:id",
  verificarToken,
  verificarAdministrador,
  async (req, res) => {
    try {
      const ruta = await Ruta.findByPk(req.params.id);

      if (!ruta) {
        return res.status(404).json({
          mensaje: "Ruta no encontrada",
        });
      }

      await ruta.destroy();

      return res.json({
        mensaje: "Ruta eliminada correctamente",
      });
    } catch (error) {
      console.error("Error al eliminar ruta:", error);

      return res.status(500).json({
        mensaje: "Error al eliminar la ruta",
      });
    }
  }
);

export default router;
