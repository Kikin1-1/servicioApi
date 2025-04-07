// app.js
import express from "express";
import http from "http";
import path from "path";
import bodyParser from "body-parser";
import ejs from "ejs";
import { fileURLToPath } from "url";
import cors from "cors";
import misRutas from "./router/index.js"; // ✅ ya exportado por default

// Obtener __dirname con ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Motor de vistas
app.set("view engine", "ejs");

// Middlewares
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(misRutas);

// Cabeceras CORS personalizadas (opcional si ya usas cors())
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Puerto
const puerto = process.env.PORT || 3000;

app.listen(puerto, () => {
  console.log("✅ Iniciando el servidor en el puerto", puerto);
});
