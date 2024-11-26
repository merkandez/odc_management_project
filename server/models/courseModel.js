import connectionDb from '../database/connectionDb'
import { DataTypes } from 'sequelize'

const courseModel = connectionDb.define(
    'Course',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
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
        },
        tickets: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },

    {
        sequelize: connectionDb,
        modelName: 'Course',
        tableName: 'courses',
        timestamps: false,
    }
)

export default courseModel
