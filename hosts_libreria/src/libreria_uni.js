import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { pool } from "../database/conector.js";

// Inicializar la app de Express
const app = express();

// Habilitar CORS y parseo de JSON
app.use(cors());
app.use(bodyParser.json());

// Definir una ruta para obtener libros de la tabla libros_biblioteca
app.get('/libros', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM libros_biblioteca;");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener libros' });
  }
});

// Definir una ruta para agregar un libro
app.post('/libros', async (req, res) => {
  const { id, nombre, descripcion, imagen_url, autor, categoria_id, disponible } = req.body;

  try {
    await pool.query(
      "INSERT INTO libros_biblioteca (id, nombre, descripcion, imagen_url, autor, categoria_id, disponible) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [id, nombre, descripcion, imagen_url, autor, categoria_id, disponible]
    );
    res.status(201).json({ message: 'Libro agregado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al agregar libro' });
  }
});

// Iniciar el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
