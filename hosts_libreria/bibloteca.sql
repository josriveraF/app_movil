-- Drop tables if they exist to start fresh
DROP TABLE IF EXISTS public.intercambios_libros CASCADE;
DROP TABLE IF EXISTS public.solicitudes_intercambio CASCADE;
DROP TABLE IF EXISTS public.libros_personales CASCADE;
DROP TABLE IF EXISTS public.prestamos_biblioteca CASCADE;
DROP TABLE IF EXISTS public.stock_biblioteca CASCADE;
DROP TABLE IF EXISTS public.libros_biblioteca CASCADE;
DROP TABLE IF EXISTS public.categorias CASCADE;
DROP TABLE IF EXISTS public.usuarios CASCADE;

-- Create table usuarios
CREATE TABLE public.usuarios
(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    correo VARCHAR(255) NOT NULL UNIQUE,
    apodo VARCHAR(50),
    contraseña VARCHAR(255) NOT NULL,
    rol VARCHAR(20) NOT NULL
);

-- Create table categorias
CREATE TABLE public.categorias
(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);

-- Create table libros_biblioteca
CREATE TABLE public.libros_biblioteca
(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    imagen_url VARCHAR(700),
    autor VARCHAR(255),
    categoria_id INT REFERENCES public.categorias(id) ON DELETE SET NULL,
    disponible BOOLEAN DEFAULT TRUE
);

-- Create table stock_biblioteca
CREATE TABLE public.stock_biblioteca
(
    libro_id INT REFERENCES public.libros_biblioteca(id) ON DELETE CASCADE,
    cantidad INT NOT NULL,
    PRIMARY KEY (libro_id)
);

-- Create table prestamos_biblioteca
CREATE TABLE public.prestamos_biblioteca
(
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES public.usuarios(id) ON DELETE CASCADE,
    libro_id INT REFERENCES public.libros_biblioteca(id) ON DELETE CASCADE,
    fecha_prestamo TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_devolucion TIMESTAMP,
    estado VARCHAR(20) NOT NULL
);

-- Create table libros_personales
CREATE TABLE public.libros_personales
(
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES public.usuarios(id) ON DELETE CASCADE,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    imagen_url VARCHAR(255),
    estado INT CHECK (estado >= 1 AND estado <= 10),
    categoria_id INT REFERENCES public.categorias(id) ON DELETE SET NULL
);

-- Create table solicitudes_intercambio
CREATE TABLE public.solicitudes_intercambio
(
    id SERIAL PRIMARY KEY,
    libro_solicitado_id INT REFERENCES public.libros_personales(id) ON DELETE CASCADE,
    libro_ofrecido_id INT REFERENCES public.libros_personales(id) ON DELETE CASCADE,
    solicitante_id INT REFERENCES public.usuarios(id) ON DELETE CASCADE,
    receptor_id INT REFERENCES public.usuarios(id) ON DELETE CASCADE,
    estado VARCHAR(20) DEFAULT 'pendiente'
);

-- Create table intercambios_libros
CREATE TABLE public.intercambios_libros
(
    id SERIAL PRIMARY KEY,
    solicitante_id INT REFERENCES public.usuarios(id) ON DELETE CASCADE,
    receptor_id INT REFERENCES public.usuarios(id) ON DELETE CASCADE,
    libro_solicitado_id INT REFERENCES public.libros_personales(id) ON DELETE CASCADE
);

-- aun no fuciona
CREATE TABLE historial_prestamos (
    id SERIAL PRIMARY KEY,            -- Identificador único para cada registro
    usuario_id INTEGER NOT NULL,      -- ID del usuario (no puede ser nulo)
    libro_id INTEGER NOT NULL,        -- ID del libro (no puede ser nulo)
    fecha_prestamo TIMESTAMP NOT NULL, -- Fecha de préstamo (no puede ser nulo)
    fecha_devolucion TIMESTAMP NOT NULL, -- Fecha de devolución (no puede ser nulo)
    created_at TIMESTAMP DEFAULT NOW(), -- Fecha y hora de creación del registro
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),  -- Relación con la tabla de usuarios
    FOREIGN KEY (libro_id) REFERENCES libros_biblioteca(id) -- Relación con la tabla de libros
);


-- Insert categories into categorias
INSERT INTO public.categorias (nombre)
VALUES 
('Tecnología'),
('Ciencia Ficción'),
('Historia'),
('Literatura'),
('Medicina');

-- Insert books into libros_biblioteca (each book is linked to a category through categoria_id)
-- Technology Area
INSERT INTO public.libros_biblioteca (nombre, descripcion, imagen_url, autor, categoria_id, disponible)
VALUES
('Estructuras de Datos y Algoritmos', 
 'Un enfoque práctico para comprender los conceptos fundamentales de estructuras de datos y algoritmos en programación.', 
 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.comunidadbaratz.com%2Fblog%2F6-movimientos-para-abrir-correctamente-un-libro-nuevo%2F&psig=AOvVaw2IKzfx2LIFs2dYL4c3w2rQ&ust=1729189872189000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOj-k7LEk4kDFQAAAAAdAAAAABAE', 'John Doe', 1, TRUE),
 
('Introducción a la Inteligencia Artificial', 
 'Una introducción completa a los fundamentos y aplicaciones de la inteligencia artificial en la vida moderna.', 
 'https://drive.google.com/file/d/1ki9Es5SqUnVhFnPnTpIDJXATSNwKdjSV/view?usp=drive_link', 'Jane Smith', 1, TRUE);

-- Science Fiction Area
INSERT INTO public.libros_biblioteca (nombre, descripcion, imagen_url, autor, categoria_id, disponible)
VALUES
('El Marciano', 
 'La increíble historia de supervivencia de un astronauta varado en Marte. Una mezcla de ciencia y ficción.', 
 'https://drive.google.com/file/d/1oORGmxUs2-_YLZOOI0bWegwICMNXCRum/view?usp=drive_link', 'Andy Weir', 2, TRUE),
 
('Dune', 
 'Una épica historia de ciencia ficción que explora la lucha por el poder en un planeta desértico.', 
 'https://drive.google.com/file/d/111t21kSvFvpIUHQgY_4KhoO0qKtHytCz/view?usp=drive_link', 'Frank Herbert', 2, TRUE);

-- History Area
INSERT INTO public.libros_biblioteca (nombre, descripcion, imagen_url, autor, categoria_id, disponible)
VALUES
('La Segunda Guerra Mundial', 
 'Un exhaustivo análisis de los eventos que llevaron al conflicto más devastador en la historia de la humanidad.', 
 'https://drive.google.com/file/d/1nyz6cdZlCNRfYL6rLB_teLwnAqBpEVeN/view?usp=drive_link', 'Winston Churchill', 3, TRUE),
 
('El Ascenso y la Caída del Imperio Romano', 
 'Un viaje detallado a través de la historia del Imperio Romano, desde su apogeo hasta su declive.', 
 'https://drive.google.com/file/d/1r3ctOtsFwg3Fbnigu8xYaLJU18mHcfUI/view?usp=drive_link', 'Edward Gibbon', 3, TRUE);

-- Literature Area
INSERT INTO public.libros_biblioteca (nombre, descripcion, imagen_url, autor, categoria_id, disponible)
VALUES
('Cien Años de Soledad', 
 'Una obra maestra del realismo mágico, que narra la historia de la familia Buendía en el pueblo ficticio de Macondo.', 
 'https://drive.google.com/file/d/19XDaTR1kh9dgjd5__IgQPirL15MX7HO6/view?usp=drive_link', 'Gabriel García Márquez', 4, TRUE),
 
('Don Quijote de la Mancha', 
 'Una de las mayores obras literarias de la historia, que cuenta las aventuras de un hidalgo en busca de gloria.', 
 'https://drive.google.com/file/d/1M_kXpof-U6Lsh24x1UIFAVz2r_ax8wri/view?usp=drive_link', 'Miguel de Cervantes', 4, TRUE);

-- Medicine Area
INSERT INTO public.libros_biblioteca (nombre, descripcion, imagen_url, autor, categoria_id, disponible)
VALUES
('Anatomía Humana', 
 'Una referencia esencial para estudiantes de medicina, con ilustraciones detalladas del cuerpo humano.', 
 'https://drive.google.com/file/d/16H1SY3hw-YidrHiapHz-WdnGILyzapaT/view?usp=drive_link', 'Henry Gray', 5, TRUE),
 
('Farmacología Básica y Clínica', 
 'Una guía comprensiva para entender los principios básicos de la farmacología y su aplicación clínica.', 
 'https://drive.google.com/file/d/1q9p87zY-bKmP-9lqAWsb0YLt_KGiS7dr/view?usp=drive_link', 'Bertram Katzung', 5, TRUE);

-- Insert stock into stock_biblioteca
INSERT INTO public.stock_biblioteca (libro_id, cantidad)
VALUES
(1, 10),  -- Estructuras de Datos y Algoritmos
(2, 7),   -- Introducción a la Inteligencia Artificial
(3, 5),   -- El Marciano
(4, 8),   -- Dune
(5, 6),   -- La Segunda Guerra Mundial
(6, 4),   -- El Ascenso y la Caída del Imperio Romano
(7, 10),  -- Cien Años de Soledad
(8, 12),  -- Don Quijote de la Mancha
(9, 9),   -- Anatomía Humana
(10, 7);  -- Farmacología Básica y Clínica
INSERT INTO public.usuarios (nombre, correo, apodo, contraseña, rol)
VALUES ('José', 'jose@example.com', 'Pepe', 'a1234', 'alumno');