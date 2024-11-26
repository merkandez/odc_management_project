import Admin from './adminModel'
import Course from './courseModel'
import Enrollment from './enrollmentModel'

// Relaciones entre Course y Enrollment
Course.hasMany(Enrollment, {
    foreignKey: 'id_course',
    onDelete: 'CASCADE',
})
Enrollment.belongsTo(Course, {
    foreignKey: 'id_course',
})

// Relaciones entre Admin y Enrollment
Admin.hasMany(Enrollment, {
    foreignKey: 'id_admin',
    onDelete: 'CASCADE',
})
Enrollment.belongsTo(Admin, {
    foreignKey: 'id_admin',
})

export { Admin, Course, Enrollment }
