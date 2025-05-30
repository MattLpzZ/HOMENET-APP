-- Crear base de datos (opcional si ya la creaste)
CREATE DATABASE datos_homenet;

-- Conectar a la base de datos (solo si estás en psql)
\c homenet;

-- Crear tabla productos
CREATE TABLE inventario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(50),       -- HN2-M00-S1-T1
    imagen VARCHAR(255),       -- URL o nombre de la imagen
    ubicacion VARCHAR(100),
    potencia VARCHAR(50),
    notas TEXT
);