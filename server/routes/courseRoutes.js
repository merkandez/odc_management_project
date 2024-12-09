import express from 'express';
import { getAllCourses, getCourseById, createCourse, getStudentsByCourse } from '../controllers/coursesController.js';
import { checkRol } from '../middleware/rolMiddleware.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const courseRoutes = express.Router();

courseRoutes.get('/', authMiddleware, checkRol(['superadmin', 'admin', 'facilitator']), getAllCourses);
courseRoutes.get('/:id', authMiddleware, checkRol(['superadmin', 'admin', 'facilitator']), getCourseById);
courseRoutes.get('/:id/students', authMiddleware, checkRol(['superadmin', 'admin', 'facilitator']), getStudentsByCourse);
courseRoutes.post('/', authMiddleware, checkRol(['superadmin', 'admin']), createCourse);

export default courseRoutes;