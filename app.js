import express from "express";
import http from "http";
import path from "path";
import bodyParser from "body-parser";
import ejs from "ejs";
import { fileURLToPath } from "url";
import misRutas from "./router/index.js";
import cors from "cors";
import dataBase from "./module/model.js"

//constantes

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

const app = express();


app.set("view engine","ejs");

    app.use(cors());
    app.use(misRutas);
    app.use(express.static(path.join(__dirname, "public")));
    app.use(express.urlencoded({ extended: true }));    
    app.use(express.json());


    app.use((req,res,next) => {
        res.setHeader("Access-Control-Allow-Origin","*");
        res.setHeader("Access-Control-Allow-Methods","GET, POST,OPTIONS");
        res.setHeader("Access-Control-Allow-Headers","Content-Type");
    })

    const puerto = 3000;
    app.listen(puerto, () => {
        console.log("Iniciando el servidor");
    });