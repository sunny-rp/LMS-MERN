import express from 'express'
import { addcourse, educatorDashboardData, getEducatorCourses, getEnrolledStudentsData, updateRoleToEducator } from '../controllers/educator.controller.js'
import { protectEducator } from '../middlewares/auth.middleware.js'
import upload from '../config/multer.js'

const educatorRouter = express.Router()


// educatorRouter.route('/update-role').get(updateRoleToEducator);

educatorRouter.get('/update-role',updateRoleToEducator)
educatorRouter.post('/add-course',upload.single('image'), protectEducator , addcourse)
educatorRouter.get('/courses', protectEducator , getEducatorCourses )
educatorRouter.get('/dashboard',protectEducator,educatorDashboardData)
educatorRouter.get('/enrolled-students',protectEducator,getEnrolledStudentsData)

export default educatorRouter;