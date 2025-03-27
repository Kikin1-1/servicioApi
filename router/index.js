import express,{Router} from "express";
import cors from "cors";
import json from "body-parser/lib/types/json.js"; 
import {sumar,resta,PI,data} from "../module/libreria.js";

export const router = express.Router();


router.get("/",(req,res)=>{
    res.send("Se cargo la pagina");
});

router.get("/1",(req,res)=>{
    res.send("La suma es: " + sumar(10,2));
});

router.get("/2",(req,res)=>{
    res.json(data);
});
export default router;