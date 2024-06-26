
 
import  sql  from "mssql";
import { getConnection } from "../models/connection.js";

export const getBloqueados = async (req, res) => {
    try {
          
      const pool = await getConnection();
      const result = await pool
        .request()
        .execute("SP_USUARIOSBLOCKS");
           // Envía el resultado como respuesta JSON
      res.json(result.recordset);
    } catch (error) {
      // Manejar errores si hay algún problema con la ejecución del procedimiento almacenado
      console.error(error);
      res.status(500).json({ error: "Error al obtener datos" });
    }
  }; 

  function padWithZeros(codpersona) {
    return ('0000000' + codpersona).slice(-7);
}


  export const desbloquearUsuario = async (req, res) => {
    let { codpersona } = req.body;
    console.log(codpersona)
    if (!codpersona) {
        return res.status(400).json({ error: 'El parámetro codpersona es requerido' });
    }
    codpersona = padWithZeros(codpersona)
    console.log(codpersona)
    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input('p_codpersona', codpersona) // Agrega el parámetro de entrada
            .execute('SP_DESBLOQSUARIOS');
        
        // Envía una respuesta indicando éxito
        res.json({ message: 'Estado actualizado exitosamente', result: result.recordset });
    } catch (error) {
        console.error('Error al cambiar estado:', error);
        res.status(500).json({ error: 'Error al cambiar estado' });
    }
};