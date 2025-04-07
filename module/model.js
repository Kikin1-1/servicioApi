// module/model.js
// module/model.js
import mysql from "mysql2/promise";

// Esta función devuelve una conexión lista para usarse
export async function getConnection() {
  return await mysql.createConnection({
    host: "72.167.57.169", // IP de tu BD en GoDaddy
    user: "kikin",
    password: "Wowmimis123",
    database: "patrick",
    port: 3306
  });
}

