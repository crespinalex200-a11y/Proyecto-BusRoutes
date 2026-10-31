CREATE DATABASE IF NOT EXISTS base_busroutes
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE base_busroutes;

CREATE TABLE IF NOT EXISTS rutas (
  id_ruta INT UNSIGNED NOT NULL AUTO_INCREMENT,
  codigo VARCHAR(20) NOT NULL,
  nombre VARCHAR(150) NOT NULL,
  origen VARCHAR(100) NOT NULL,
  destino VARCHAR(100) NOT NULL,
  tiempo_minutos SMALLINT UNSIGNED NOT NULL DEFAULT 30,
  tarifa DECIMAL(6,2) NOT NULL DEFAULT 0.00,
  estado ENUM('Activa', 'En mantenimiento', 'Suspendida') NOT NULL DEFAULT 'Activa',
  creado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_ruta),
  UNIQUE KEY uq_rutas_codigo (codigo),
  CONSTRAINT chk_rutas_tarifa CHECK (tarifa >= 0)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS paradas (
  id_parada INT UNSIGNED NOT NULL AUTO_INCREMENT,
  codigo VARCHAR(20) NOT NULL,
  nombre VARCHAR(150) NOT NULL,
  ubicacion VARCHAR(150) NOT NULL,
  PRIMARY KEY (id_parada),
  UNIQUE KEY uq_paradas_codigo (codigo)
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS ruta_parada (
  id_ruta INT UNSIGNED NOT NULL,
  id_parada INT UNSIGNED NOT NULL,
  orden_parada SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY (id_ruta, id_parada),
  UNIQUE KEY uq_ruta_orden (id_ruta, orden_parada),
  CONSTRAINT fk_ruta_parada_ruta FOREIGN KEY (id_ruta)
    REFERENCES rutas (id_ruta) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_ruta_parada_parada FOREIGN KEY (id_parada)
    REFERENCES paradas (id_parada) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS enlaces_utiles (
  id_enlace INT UNSIGNED NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(100) NOT NULL,
  descripcion VARCHAR(255) DEFAULT NULL,
  url VARCHAR(500) NOT NULL,
  es_real BOOLEAN NOT NULL DEFAULT FALSE,
  activo BOOLEAN NOT NULL DEFAULT TRUE,
  PRIMARY KEY (id_enlace)
) ENGINE=InnoDB;

INSERT IGNORE INTO rutas (codigo, nombre, origen, destino, tiempo_minutos, tarifa, estado) VALUES
('101', 'Centro – Universidad', 'Centro', 'UES', 30, 0.45, 'Activa'),
('202', 'Centro – Santa Tecla', 'Centro', 'Santa Tecla', 45, 0.50, 'Activa'),
('303', 'San Salvador – Apopa', 'San Salvador', 'Apopa', 60, 0.60, 'Activa'),
('404', 'San Salvador – Soyapango', 'San Salvador', 'Soyapango', 40, 0.50, 'Activa'),
('505', 'Mejicanos – Centro', 'Mejicanos', 'Centro', 25, 0.40, 'En mantenimiento'),
('606', 'Ilopango – Centro', 'Ilopango', 'Centro', 50, 0.55, 'Activa'),
('707', 'Terminal – Mercado', 'Terminal', 'Mercado', 20, 0.35, 'Suspendida');

INSERT IGNORE INTO paradas (codigo, nombre, ubicacion) VALUES
('P001', 'Centro Histórico', 'Centro'),
('P002', 'Plaza Barrios', 'San Salvador'),
('P003', 'Universidad de El Salvador', 'Universidad'),
('P004', 'Santa Tecla', 'Santa Tecla'),
('P005', 'Apopa', 'Apopa'),
('P006', 'Soyapango', 'Soyapango');

INSERT IGNORE INTO ruta_parada (id_ruta, id_parada, orden_parada)
SELECT r.id_ruta, p.id_parada,
        CASE p.codigo
          WHEN 'P001' THEN 1
          WHEN 'P002' THEN 2
          WHEN 'P003' THEN 3
          WHEN 'P004' THEN 2
          WHEN 'P005' THEN 2
          WHEN 'P006' THEN 2
          ELSE 99
        END
FROM rutas r
JOIN paradas p ON
  (r.codigo = '101' AND p.codigo IN ('P001','P002','P003')) OR
  (r.codigo = '202' AND p.codigo IN ('P001','P004')) OR
  (r.codigo = '303' AND p.codigo IN ('P001','P005')) OR
  (r.codigo = '404' AND p.codigo IN ('P001','P006'));

INSERT INTO enlaces_utiles (titulo, descripcion, url, es_real, activo)
SELECT 'Noticias de tránsito', 'Facebook del VMT El Salvador', 'https://www.facebook.com/VMTElSalvador/', TRUE, TRUE
WHERE NOT EXISTS (SELECT 1 FROM enlaces_utiles WHERE titulo = 'Noticias de tránsito');

INSERT INTO enlaces_utiles (titulo, descripcion, url, es_real, activo)
SELECT 'Horarios de buses', 'Enlace de demostración', '#horarios', FALSE, TRUE
WHERE NOT EXISTS (SELECT 1 FROM enlaces_utiles WHERE titulo = 'Horarios de buses');

INSERT INTO enlaces_utiles (titulo, descripcion, url, es_real, activo)
SELECT 'Avisos viales', 'Enlace de demostración', '#avisos', FALSE, TRUE
WHERE NOT EXISTS (SELECT 1 FROM enlaces_utiles WHERE titulo = 'Avisos viales');

INSERT INTO enlaces_utiles (titulo, descripcion, url, es_real, activo)
SELECT 'Contactos de transporte', 'Enlace de demostración', '#contacto', FALSE, TRUE
WHERE NOT EXISTS (SELECT 1 FROM enlaces_utiles WHERE titulo = 'Contactos de transporte');

  CREATE TABLE IF NOT EXISTS usuarios(
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    tipo_usuario VARCHAR(20) NOT NULL DEFAULT
  'usuario',
    fecha_registro TIMESTAMP DEFAULT
    CURRENT_TIMESTAMP
    );
    