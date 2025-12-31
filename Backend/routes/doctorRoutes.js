import express from 'express'
import { appointmentsDoctor, completeAppointment, dashBoard, docProfile, doctorList, doctorLogin, updateDocProfile } from '../controllers/doctorControler.js'
import authDoc from '../middlewares/authDoc.js'
import { cancelAppointments } from '../controllers/adminController.js'

const doctorRouter= express.Router()

doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',doctorLogin)
doctorRouter.get('/appointments',authDoc,appointmentsDoctor)
doctorRouter.post('/cancel-appointments',authDoc,cancelAppointments)
doctorRouter.post('/complete-appointment',authDoc,completeAppointment)
doctorRouter.get('/dashBoard',authDoc,dashBoard)
doctorRouter.get('/doctorProfile',authDoc,docProfile)
doctorRouter.post('/updateDoctor',authDoc,updateDocProfile)


export default doctorRouter