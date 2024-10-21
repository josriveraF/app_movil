import express from "express";
import cors from "cors";
import multer from "multer";
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from 'url';
import fs from 'fs'; // Importar fs para crear carpetas
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
    const result = await pool.query(`
      SELECT l.id,l.nombre, l.descripcion, c.nombre AS categoria, s.cantidad, l.imagen_url, l.autor, l.disponible
      FROM public.libros_biblioteca l
      JOIN public.stock_biblioteca s ON l.id = s.libro_id
      JOIN public.categorias c ON l.categoria_id = c.id;
    `);
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
//prestamo libros bibloteca y alumono
app.post('/prestar', async (req, res) => {
  const { usuario_id, libro_id, fecha_prestamo, fecha_devolucion, estado } = req.body;

  try {
    await pool.query('BEGIN');

    // Verifica el stock del libro
    const stockResult = await pool.query(
      "SELECT cantidad FROM stock_biblioteca WHERE libro_id = $1 FOR UPDATE", 
      [libro_id]
    );

    const cantidadDisponible = stockResult.rows[0].cantidad;
    console.log(`Cantidad disponible antes del préstamo: ${cantidadDisponible}`);

    if (cantidadDisponible > 0) {
      // Inserta el préstamo en la tabla prestamos_biblioteca
      await pool.query(
        "INSERT INTO prestamos_biblioteca (usuario_id, libro_id, fecha_prestamo, fecha_devolucion, estado) VALUES ($1, $2, $3, $4, $5)", 
        [usuario_id, libro_id, fecha_prestamo, fecha_devolucion, estado]
      );
      
      // Actualiza el stock restando una unidad
      await pool.query(
        "UPDATE stock_biblioteca SET cantidad = cantidad - 1 WHERE libro_id = $1", 
        [libro_id]
      );

      // Verifica si el stock llegó a 0
      const updatedStockResult = await pool.query(
        "SELECT cantidad FROM stock_biblioteca WHERE libro_id = $1", 
        [libro_id]
      );
      const updatedCantidad = updatedStockResult.rows[0].cantidad;
      console.log(`Cantidad disponible después del préstamo: ${updatedCantidad}`);

      if (updatedCantidad === 0) {
        // Si es 0, actualiza el estado del libro en la tabla libros_biblioteca
        console.log(`Actualizando el estado del libro ${libro_id} a 'false' porque el stock es 0`);
        await pool.query(
          "UPDATE libros_biblioteca SET estado = false WHERE id = $1", 
          [libro_id]
        );
      }

      await pool.query('COMMIT');
      res.status(201).json({ message: 'Préstamo registrado, stock actualizado, y estado del libro cambiado a no disponible' });
    } else {
      await pool.query('ROLLBACK');
      res.status(400).json({ error: 'No hay stock disponible para este libro' });
    }
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error('Error al registrar el préstamo:', error);
    res.status(500).json({ error: 'Ocurrió un error al registrar el préstamo' });
  }
});
// filtra solo un id 
app.get('/prestamos', async (req, res) => {
  try {
    const {id}= req.query;
    // Consulta para obtener todos los registros de la tabla 'prestamos_biblioteca' era mi query pero la modidique para poder tener los datos exacto
     // SELECT u.nombre AS usuario_nombre, l.nombre AS libro_nombre, 
    //  pb.fecha_prestamo, pb.fecha_devolucion,
     // ( pb.fecha_devolucion -pb.fecha_prestamo) as prestamo,
    //  EXTRACT(DAY FROM (pb.fecha_devolucion - CURRENT_DATE)) AS dias,
    //  EXTRACT(HOUR FROM (pb.fecha_devolucion - CURRENT_DATE)) AS horas,
    //  EXTRACT(MINUTE FROM (pb.fecha_devolucion - CURRENT_DATE)) AS minutos,
     // EXTRACT(SECOND FROM (pb.fecha_devolucion - CURRENT_DATE)) AS segundos
    let query = `
    SELECT 
      u.nombre AS usuario_nombre, 
      l.nombre AS libro_nombre, 
      pb.fecha_prestamo, 
      pb.fecha_devolucion,
      (pb.fecha_devolucion - pb.fecha_prestamo) AS prestamo,
      pb.fecha_devolucion - NOW()  AS tiempo_restante
    FROM prestamos_biblioteca pb
          JOIN usuarios u ON pb.usuario_id = u.id
          JOIN libros_biblioteca l ON pb.libro_id = l.id
    `;

    const params=[];
    if (id){
      query += 'where u.id=$1';
      params.push(id);
    }
    
    const result = await pool.query(query, params.length ? params : undefined);
    // Enviar los resultados
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los préstamos' });
  }
});



//------------------------------------------------------------------------------------


app.delete('/prestamosHisto', async (req, res) => {
  const { id } = req.query; // Recibe el ID del usuario desde el frontend

  try {
    // Buscar el préstamo activo del usuario
    const prestamoQuery = `
      SELECT pb.id, pb.usuario_id, pb.libro_id, pb.fecha_prestamo, pb.fecha_devolucion
      FROM prestamos_biblioteca pb
      WHERE pb.usuario_id = $1
      ORDER BY pb.fecha_prestamo DESC
      LIMIT 1
    `;
    const prestamoResult = await pool.query(prestamoQuery, [id]);

    if (prestamoResult.rows.length === 0) {
      return res.status(404).json({ error: 'No se encontró ningún préstamo activo para este usuario' });
    }

    const prestamo = prestamoResult.rows[0];

    // Eliminar el préstamo de la tabla prestamos_biblioteca
    const deleteQuery = `
      DELETE FROM prestamos_biblioteca
      WHERE id = $1
    `;
    await pool.query(deleteQuery, [prestamo.id]);

    // Incrementar el stock del libro en la tabla de libros_biblioteca
    const updateStockQuery = `
      UPDATE libros_biblioteca
      SET stock = stock + 1
      WHERE id = $1
    `;
    await pool.query(updateStockQuery, [prestamo.libro_id]);

    // Registrar en la tabla de historial de préstamos
    const insertHistorialQuery = `
      INSERT INTO historial_prestamos (usuario_id, libro_id, fecha_prestamo, fecha_devolucion)
      VALUES ($1, $2, $3, $4)
    `;
    await pool.query(insertHistorialQuery, [
      prestamo.usuario_id,
      prestamo.libro_id,
      prestamo.fecha_prestamo,
      prestamo.fecha_devolucion
    ]);

    res.status(200).json({ message: 'Préstamo eliminado y stock actualizado' });
  } catch (err) {
    console.error('Error al procesar la devolución:', err);
    res.status(500).json({ error: 'Error al procesar la devolución' });
  }
});


app.get('/libro_alumno', async (req, res) => {
  try {
    const result = await pool.query(`
      select l.usuario_id,c.nombre, l.nombre,l.descripcion, l.imagen_url,l.estado
      from public.libros_personales L join public.categorias c on (l.id = c.id);
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener libros_alumno' });
  }
});



// Iniciar el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
