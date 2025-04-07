// module/model.js
import mysql from 'mysql2';

const db = mysql.createConnection({
  host: '72.167.57.169', // <-- o el host real
  user: 'kikin',
  password: 'Wowmimis123',
  database: 'patrick',
  port: 3306
});

db.connect(err => {
  if (err) {
    console.error('❌ Error al conectar con la base de datos:', err.message);
  } else {
    console.log('✅ Conectado exitosamente a la base de datos');
  }
});

export default db;