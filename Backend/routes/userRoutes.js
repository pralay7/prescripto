import express from 'express'
import {  bookSlot, cancelAppointments, getUserData, listAppointment, paymentRazorpay, registerUser, updateProfile, userLogin, verifyPayment} from '../controllers/userController.js'
import authuser from '../middlewares/authuser.js'
import upload from '../middlewares/multer.js'
const userRouter =express.Router()


userRouter.post('/register',registerUser)
userRouter.post('/login',userLogin)
userRouter.get('/profile',authuser,getUserData)
userRouter.post('/update-profile',upload.single('image'),authuser,updateProfile)
userRouter.post('/book-appointment',authuser,bookSlot)
userRouter.get('/appointments',authuser,listAppointment)
userRouter.post('/cancel-appointments',authuser,cancelAppointments) 
userRouter.post('/payment-razorpay',authuser,paymentRazorpay)
userRouter.post('/payment-verification',authuser,verifyPayment)

export default userRouter