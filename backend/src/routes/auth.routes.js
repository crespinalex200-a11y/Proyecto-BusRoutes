
import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Usuario from "../models/usuario.js";

const router = Router();

// REGISTRO DE USUARIO
router.post("/registro", async (req, res) => {
    try {
    const { nombre, correo, password } = req.body;

    if (
        typeof nombre !== "string" ||
        typeof correo !== "string" ||
        typeof password !== "string" ||
        !nombre.trim() ||
        !correo.trim() ||
        !password
    ) {
        return res.status(400).json({
        mensaje: "Nombre, correo y contraseña son obligatorios",
        });
    }

    if (password.length < 8) {
        return res.status(400).json({
        mensaje: "La contraseña debe tener al menos 8 caracteres",
        });
    }

    const correoNormalizado = correo.trim().toLowerCase();

    const usuarioExistente = await Usuario.findOne({
        where: { correo: correoNormalizado },
    });

    if (usuarioExistente) {
        return res.status(409).json({
        mensaje: "El correo ya está registrado",
        });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const nuevoUsuario = await Usuario.create({
        nombre: nombre.trim(),
        correo: correoNormalizado,
        password: passwordHash,
        rol: "usuario",
    });

    return res.status(201).json({
        mensaje: "Usuario registrado correctamente",
        usuario: {
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        correo: nuevoUsuario.correo,
        rol: nuevoUsuario.rol,
        },
    });
    } catch (error) {
    console.error("Error al registrar usuario:", error);

    if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({
        mensaje: "El correo ya está registrado",
        });
    }

    return res.status(500).json({
        mensaje: "Error al registrar el usuario",
    });
    }
});

// INICIO DE SESIÓN
router.post("/login", async (req, res) => {
    try {
    const { correo, password } = req.body;

    if (
        typeof correo !== "string" ||
        typeof password !== "string" ||
        !correo.trim() ||
        !password
    ) {
        return res.status(400).json({
        mensaje: "Correo y contraseña son obligatorios",
        });
    }

    const usuario = await Usuario.findOne({
        where: {
        correo: correo.trim().toLowerCase(),
        },
    });

    if (
        !usuario ||
        !(await bcrypt.compare(password, usuario.password))
    ) {
        return res.status(401).json({
        mensaje: "Correo o contraseña incorrectos",
        });
    }

    if (!process.env.JWT_SECRET) {
        console.error("Falta configurar JWT_SECRET en .env");

        return res.status(500).json({
        mensaje: "La autenticación no está configurada",
        });
    }

    const token = jwt.sign(
        {
        id: usuario.id,
        rol: usuario.rol,
        },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
    );

    return res.json({
        mensaje: "Inicio de sesión correcto",
        token,
        usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol,
        },
    });
    } catch (error) {
    console.error("Error al iniciar sesión:", error);

    return res.status(500).json({
        mensaje: "Error al iniciar sesión",
    });
    }
});

export default router;
