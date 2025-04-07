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

// 🔥 Nueva ruta que consulta la base de datos
router.get("/datos", (req, res) => {
    const query = "SELECT * FROM marco"; // Reemplaza "tu_tabla" por el nombre real

    db.query(query, (err, results) => {
        if (err) {
            console.error("❌ Error al consultar la base de datos:", err);
            return res.status(500).send("Error al consultar la base de datos");
        }

        res.render("datos", { datos: results }); // Envia resultados a la vista
    });
});

export default router;
