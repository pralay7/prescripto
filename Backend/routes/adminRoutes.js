import express from 'express'
import { addDoctor ,adminDash,adminLogin, allDoctors, cancelAppointments, getAllDoctorsAdmin} from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authadmin from '../middlewares/authAdmin.js'
import { changeAvailability } from '../controllers/doctorControler.js'

const adminRouter = express.Router()

adminRouter.post('/add-doctor',authadmin,upload.single('image'), addDoctor)
adminRouter.post('/login',adminLogin)
adminRouter.post('/all-doctors',authadmin,allDoctors)
adminRouter.get('/all-appointments',authadmin,getAllDoctorsAdmin)
adminRouter.post('/change-availability',authadmin,changeAvailability)
adminRouter.post('/cancel-appointments',authadmin,cancelAppointments)
adminRouter.get('/dashboard',authadmin,adminDash)
export default adminRouter