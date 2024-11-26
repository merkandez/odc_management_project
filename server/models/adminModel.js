import connectionDb from '../database/connectionDb'
import { DataTypes } from 'sequelize'

const adminModel = connectionDb.define(
    'Admin',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rol: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: connectionDb,
        modelName: 'Admin',
        tableName: 'admins',
        timestamps: false,
    }
)

export default adminModel
