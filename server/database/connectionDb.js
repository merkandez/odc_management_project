import { Sequelize } from 'sequelize'
import {
    DB_HOST,
    DB_PASSWORD,
    DB_USER,
    DB_DEV_NAME,
    DB_PORT,
    DB_TEST_NAME,
} from '../config.js'

const DB_NAME = NODE_ENV === 'test' ? DB_TEST_NAME : DB_DEV_NAME

const connectionDb = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    port: DB_PORT,
})

try {
    await connectionDb.authenticate()
    console.log(
        'La conexión ha sido establecida exitosamente a la base de datos 🚀:',
        DB_NAME
    )
} catch (error) {
    console.error('Error al conectar con la base de datos 😱:', error)
}

export default connectionDb
