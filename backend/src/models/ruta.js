import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Ruta = sequelize.define(
  "Ruta",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      field: "id_ruta",
    },
    code: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      field: "codigo",
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      field: "nombre",
    },
    origin: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "origen",
    },
    destination: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "destino",
    },
    time: {
      type: DataTypes.SMALLINT.UNSIGNED,
      allowNull: false,
      field: "tiempo_minutos",
    },
    fare: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
      field: "tarifa",
    },
    status: {
      type: DataTypes.ENUM(
        "Activa",
        "En mantenimiento",
        "Suspendida"
      ),
      allowNull: false,
      field: "estado",
    },
  },
  {
    tableName: "rutas",
    timestamps: false,
  }
);

export default Ruta;
