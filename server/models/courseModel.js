import { DataTypes } from 'sequelize';
import connectionDb from '../database/connectionDb.js';

const Course = connectionDb.define('Course', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    external_id: {
        type: DataTypes.STRING, // Para sincronización futura con el CMS
        allowNull: true,
        unique: true, // Evita duplicados
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [5, 255], // Longitud mínima y máxima
        },
    },
    description: {
        type: DataTypes.TEXT, // Para descripciones más largas
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    schedule: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true, // Valida que sea un enlace válido
        },
    },
    tickets: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0, // No puede ser negativo
        },
    },
});

export default Course; 
