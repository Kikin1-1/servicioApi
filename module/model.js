// module/model.js
import mysql from 'mysql2/promise';

const config = {
  host: "72.167.57.169",
  user: "kikin",
  password: "Wowmimis123",
  database: "patrick",
  port: 3306
};

// 🔥 Objeto que contiene todas las funciones
export const alumnoDB = {
  listar: async () => {
    const conn = await mysql.createConnection(config);
    const [rows] = await conn.query("SELECT * FROM alumnos");
    await conn.end();
    return rows;
  },

  buscarPorId: async (id) => {
    const conn = await mysql.createConnection(config);
    const [rows] = await conn.query("SELECT * FROM alumnos WHERE id = ?", [id]);
    await conn.end();
    return rows;
  },

  buscarPorMatricula: async (matricula) => {
    const conn = await mysql.createConnection(config);
    const [rows] = await conn.query("SELECT * FROM alumnos WHERE matricula = ?", [matricula]);
    await conn.end();
    return rows;
  },

  borrarPorId: async (id) => {
    const conn = await mysql.createConnection(config);
    const [result] = await conn.query("DELETE FROM alumnos WHERE id = ?", [id]);
    await conn.end();
    return result;
  },

  actualizarPorId: async (id, datos) => {
    const conn = await mysql.createConnection(config);
    const [result] = await conn.query(
      "UPDATE alumnos SET matricula = ?, nombre = ?, domicilio = ?, fechanac = ?, sexo = ?, status = ? WHERE id = ?",
      [datos.matricula, datos.nombre, datos.domicilio, datos.fechanac, datos.sexo, datos.status, id]
    );
    await conn.end();
    return result;
  },

  cambiarStatus: async (id, status) => {
    const conn = await mysql.createConnection(config);
    const [result] = await conn.query(
      "UPDATE alumnos SET status = ? WHERE id = ?",
      [status, id]
    );
    await conn.end();
    return result;
  },

  insertar: async (datos) => {
    const conn = await mysql.createConnection(config);
    const [result] = await conn.query(
      "INSERT INTO alumnos (id, matricula, nombre, domicilio, fechanac, sexo, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [datos.id, datos.matricula, datos.nombre, datos.domicilio, datos.fechanac, datos.sexo, datos.status]
    );
    await conn.end();
    return result;
  }
};
