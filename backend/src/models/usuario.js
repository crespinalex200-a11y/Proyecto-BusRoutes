
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Usuario = sequelize.define(
    "Usuario",
    {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_usuario",
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    correo: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
        isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "contraseña",
    },
    rol: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: "usuario",
        field: "tipo_usuario",
    },
    fechaRegistro: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "fecha_registro",
    },
    },
    {
    tableName: "usuarios",
    timestamps: false,
    }
);

export default Usuario;
