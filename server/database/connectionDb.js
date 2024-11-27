//conectionDb.js
import { Sequelize } from "sequelize";
import { DB_HOST, DB_PASSWORD, DB_USER, DB_DEV_NAME, DB_PORT, DB_TEST_NAME, NODE_ENV  } from '../config.js';

//Determinar la base de datos según el entorno
const DB_NAME=NODE_ENV === 'test' ? DB_TEST_NAME:DB_DEV_NAME;

//Configurar la conexión con Sequelize
const connectionDb = new Sequelize(DB_NAME,DB_USER, DB_PASSWORD,{
    host:DB_HOST,
    dialect:'mysql',
    port:DB_PORT,
    logging:false, //Deshabilta logs para mayor claridad
    
})


try {
    await connectionDb.authenticate();
    console.log('La conexión a la base de datos fue exitosa', DB_NAME)
} catch (error) {
    console.error('Error al conectar a la base de datos', error)
}
export default connectionDb;