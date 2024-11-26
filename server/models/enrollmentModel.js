import connectionDb from '../database/connectionDb'
import { DataTypes } from 'sequelize'

const enrollmentModel = connectionDb.define(
    'Enrollment',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fullname: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        gender: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        is_first_activity: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        name_minor1: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        age_minor1: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        name_minor2: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        age_minor2: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        name_minor3: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        age_minor3: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        id_admin: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'admins',
                key: 'id',
            },
        },
        id_course: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'courses',
                key: 'id',
            },
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        accepts_newsletter: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        sequelize: connectionDb,
        modelName: 'Enrollment',
        tableName: 'enrollments',
        timestamps: true,
    }
)

export default enrollmentModel
