import express from "express";
import dotenv from "dotenv"

import  desloqRoutes from "./src/routes/desbloqueo.routes.js";
import {getConnection}from "./src/models/connection.js"
 
dotenv.config();
 
 
const app = express();
// Iniciar la conexión a la base de datos
 
getConnection();

app.use(express.static('public'));
app.use( express.json() );

 
app.use(desloqRoutes);

const port = process.env.PORT || 4001; 
 

app.listen(port, () => {
    console.log(`Servidor backend corriendo en http://localhost:${port}`);
  });
 
 
 

 
 

