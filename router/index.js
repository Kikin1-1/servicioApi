// router/index.js
import express from "express";
import { sumar, resta, PI, data } from "../module/libreria.js";
import { getConnection } from "../module/model.js";

const router = express.Router();

// Ruta principal (vista EJS)
router.get("/", (req, res) => {
  res.render("index");
});

// Ruta de suma
router.get("/1", (req, res) => {
  res.send("La suma es: " + sumar(10, 2));
});

// Ruta de datos de librería
router.get("/2", (req, res) => {
  res.send(data);
});

// Vista EJS con datos desde la BD
router.get("/datos", async (req, res) => {
  try {
    const conn = await getConnection();
    const [results] = await conn.query("SELECT * FROM marco");
    await conn.end();
    res.render("datos", { datos: results });
  } catch (err) {
    console.error("❌ Error en /datos:", err);
    res.status(500).send("Error al consultar la base de datos");
  }
});

// API JSON para HTML puro
router.get("/api/datos", async (req, res) => {
  try {
    const conn = await getConnection();
    const [results] = await conn.query("SELECT * FROM marco");
    await conn.end();
    res.json(results);
  } catch (err) {
    console.error("❌ Error en /api/datos:", err);
    res.status(500).json({ error: "Error al consultar la base de datos" });
  }
});

export default router; // ✅ Exportación por default
