import jwt from "jsonwebtoken";

export function verificarToken(req, res, next) {
    const autorizacion = req.headers.authorization;
    console.log("Authorization recibido:", autorizacion ? "SÍ" : "NO");
    console.log("Ruta solicitada:", req.method, req.originalUrl);

    if (!autorizacion || !autorizacion.startsWith("Bearer ")) {
    return res.status(401).json({
        mensaje: "Debes iniciar sesión para realizar esta acción",
    });
    }

    const token = autorizacion.split(" ")[1];

    if (!process.env.JWT_SECRET) {
    return res.status(500).json({
        mensaje: "La autenticación no está configurada",
    });
    }

    try {
    const datosUsuario = jwt.verify(token, process.env.JWT_SECRET);

    req.usuario = datosUsuario;

    next();
    } catch (error) {
    return res.status(401).json({
        mensaje: "Token inválido o vencido. Inicia sesión nuevamente",
    });
    }
}

export function verificarAdministrador(req, res, next) {
    if (!req.usuario) {
    return res.status(401).json({
        mensaje: "Debes iniciar sesión",
    });
    }

    if (req.usuario.rol !== "admin") {
    return res.status(403).json({
        mensaje: "No tienes permisos para realizar esta acción",
    });
    }

    next();
}
