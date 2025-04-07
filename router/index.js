// router/index.js
import express from "express";
import { sumar, resta, PI, data } from "../module/libreria.js";
import { alumnoDB } from "../module/model.js";

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
// API JSON para HTML puro
router.get("/ping", (req, res) => {
    res.send("✅ ¡La API está viva!");
  });
  
  // Obtener todos los alumnos
  router.get("/api/alumnos", async (req, res) => {
    try {
      const alumnos = await alumnoDB.listar();
      res.json(alumnos);
    } catch (err) {
        console.error("❌ Error al listar alumnos:", err);
      res.status(500).json({ error: "Error al listar alumnos" });
    }
  });
  
  // Obtener un alumno por ID
  router.get("/api/alumnos/:id", async (req, res) => {
    try {
      const alumno = await alumnoDB.buscarPorId(req.params.id);
      res.json(alumno);
    } catch (err) {
      res.status(500).json({ error: "Error al buscar alumno por ID" });
    }
  });
  
  // Obtener un alumno por matrícula
  router.get("/api/alumnos/matricula/:matricula", async (req, res) => {
    try {
      const alumno = await alumnoDB.buscarPorMatricula(req.params.matricula);
      res.json(alumno);
    } catch (err) {
      res.status(500).json({ error: "Error al buscar alumno por matrícula" });
    }
  });
  
  // Insertar nuevo alumno
  router.post("/api/alumnos", async (req, res) => {
    try {
      const result = await alumnoDB.insertar(req.body);
      console.error("❌ Error al insertar alumno:", err);
      res.status(201).json({ mensaje: "Alumno insertado", id: result.insertId });
    } catch (err) {
      res.status(500).json({ error: "Error al insertar alumno" });
    }
  });
  
  // Actualizar alumno por ID
  router.put("/api/alumnos/:id", async (req, res) => {
    try {
      const result = await alumnoDB.actualizarPorId(req.params.id, req.body);
      res.json({ mensaje: "Alumno actualizado", result });
    } catch (err) {
      res.status(500).json({ error: "Error al actualizar alumno" });
    }
  });
  
  // Cambiar status del alumno
  router.patch("/api/alumnos/:id/status", async (req, res) => {
    try {
      const result = await alumnoDB.cambiarStatus(req.params.id, req.body.status);
      res.json({ mensaje: "Status actualizado", result });
    } catch (err) {
      res.status(500).json({ error: "Error al cambiar status" });
    }
  });
  
  // Borrar alumno por ID
  router.delete("/api/alumnos/:id", async (req, res) => {
    try {
      const result = await alumnoDB.borrarPorId(req.params.id);
      res.json({ mensaje: "Alumno eliminado", result });
    } catch (err) {
      res.status(500).json({ error: "Error al eliminar alumno" });
    }
  });
  
  export default router;


