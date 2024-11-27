import connectionDb from "../database/connectionDb";
import { DataTypes } from "sequelize"; 


const  Enrollment = connectionDb.define('Enrollment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    enrollmentDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'enrollments'
}); 