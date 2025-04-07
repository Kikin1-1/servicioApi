import express from "express";
import { sumar, resta, PI, data } from "../module/libreria.js";
import db from "../module/model.js"; // 👈 Importa la conexión

export const router = express.Router();

// Ruta principal
router.get("/", (req, res) => {
    res.render("index");
});

// Ruta de suma
router.get("/1", (req, res) => {
    res.send("La suma es: " + sumar(10, 2));
});

// Ruta que retorna datos de librería
router.get("/2", (req, res) => {
    res.send(data);
});

// Vista EJS con datos desde la BD
router.get("/datos", (req, res) => {
    const query = "SELECT * FROM marco";

    db.query(query, (err, results) => {
        if (err) {
            console.error("❌ Error al consultar la base de datos:", err);
            return res.status(500).send("Error al consultar la base de datos");
        }

        res.render("datos", { datos: results });
    });
});

// 🔥 NUEVA RUTA: API que devuelve datos JSON
router.get("/api/datos", (req, res) => {
    const query = "SELECT * FROM marco";

    db.query(query, (err, results) => {
        if (err) {
            console.error("❌ Error al consultar la base de datos:", err);
            return res.status(500).json({ error: "Error al consultar la base de datos" });
        }

        res.json(results); // 👈 Esto lo consumirá tu HTML con fetch()
    });
});

export default router;
