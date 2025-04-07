// module/model.js
// module/model.js
import mysql from 'mysql2/promise';

// Esta función genera una nueva conexión cada vez que se llama
export async function getConnection() {
  return await mysql.createConnection({
    host: '72.167.57.169',
    user: 'kikin',
    password: 'Wowmimis123',
    database: 'patrick',
    port: 3306
  });
}
db.connect(err => {
  if (err) {
    console.error('❌ Error al conectar con la base de datos:', err.message);
  } else {
    console.log('✅ Conectado exitosamente a la base de datos');
  }
});

export default db;