import connectionDb from '../database/connectionDb'
import { DataTypes } from 'sequelize'



    const AdminModel = connectionDb.define('Admin', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      rol: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'admins',
      timestamps: false
    });
  
    AdminModel.associate = (models) => {
      AdminModel.hasMany(models.Enrollment, {
        foreignKey: 'id_admin',
        as: 'enrollments'
      });
    };
  

  export default Admin;