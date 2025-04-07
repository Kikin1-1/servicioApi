import express from "express";
import { sumar, resta, PI, data } from "../module/libreria.js";
import { getConnection } from "../module/model.js"; // 👈 nueva forma

export const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/1", (req, res) => {
  res.send("La suma es: " + sumar(10, 2));
});

router.get("/2", (req, res) => {
  res.send(data);
});

// Ruta EJS para mostrar datos
router.get("/datos", async (req, res) => {
  try {
    const conn = await getConnection();
    const [results] = await conn.query("SELECT * FROM marco");
    await conn.end(); // 👈 cerrar conexión
    res.render("datos", { datos: results });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).send("Error al consultar la base de datos");
  }
});

// Ruta API JSON para frontend
router.get("/api/datos", async (req, res) => {
  try {
    const conn = await getConnection();
    const [results] = await conn.query("SELECT * FROM marco");
    await conn.end(); // 👈 cerrar conexión
    res.json(results);
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: "Error al consultar la base de datos" });
  }
});
