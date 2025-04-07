// app.js
import express from "express";
import http from "http";
import path from "path";
import bodyParser from "body-parser";
import ejs from "ejs";
import { fileURLToPath } from "url";
import router from "./router/index.js"; // ✅ Importación por default
import cors from "cors";

// Constantes para usar __dirname en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configuración de motor de vistas
app.set("view engine", "ejs");

// Middlewares
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Mueve esto arriba
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Rutas (debe ir después)
app.use(router);

// Puerto
const puerto = 3000;

app.listen(puerto, () => {
  console.log("✅ Iniciando el servidor en el puerto", puerto);
});
