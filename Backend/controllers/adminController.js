//the data fetched will be added to aform data 
//what is form data?
//to pass form data we need a middleWare 
import validator from 'validator'
import bycrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import { json } from 'express'
import doctorModel from '../modules/doctorsModel.js'
import appointmentModel from '../modules/appointmentModel.js'
import userModel from '../modules/userModel.js'
import jwt from 'jsonwebtoken'
const addDoctor = async (req, res)=>{
    try{
        
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file
       if(!name || !email || !password || !speciality || !degree || !experience || !about||!fees ||!address ){
            return res.json({success:false,message:"Missing detail"})
       }
       if(!validator.isEmail(email)){
            return res.json({success:false,message:"incorrect email"})
       }
       if(password.length<8){
            return res.json({success:false,message:"length is less than 8"})
       }
       const salt = await bycrypt.genSalt(10)//tales values between 5 -15
       const hashedPass= await bycrypt.hash(password,salt)

       const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
       const imageUrl = imageUpload.secure_url

       const docotrData={
            name, email, image:imageUrl , password:hashedPass,speciality,
            degree, experience, about, fees, address:JSON.parse(address),
            date:Date.now()
       }
       const newDoctor = new doctorModel(docotrData)

       await newDoctor.save()
       res.send({success:true ,message:"data saved"})
    }catch(error)
    {
     console.log(error.message)
      res.json({success:false,message:error.message})

    }

}

const adminLogin= async (req, res)=>{
     try{
          const {email,password}= req.body
          if(email=== process.env.ADMIN_EMAIL && password=== process.env.ADMIN_PASSWORD){
               const token = jwt.sign(email+password,process.env.JWT_SECRET) 
               res.json({success:true,token})
          }
          else{
               res.json({success:false,message:'invalid credentials'})
          }
     }catch(error)
    {
     console.log(error.message)
      res.json({success:false,message:error.message})

    }

}



const allDoctors= async (req,res)=>{
     try{
          const doctors = await doctorModel.find({}).select('-password')
          res.json({success:true,doctors})
     }    
     catch(error){
     console.log(error.message)
     res.json({success:false,message:error.message})
   
     }
}

const getAllDoctorsAdmin =async (req,res)=>{
     try{
          const appointments = await appointmentModel.find({})
          res.json({success:true,appointments})
     }catch(error){
     console.log(error.message)
     res.json({success:false,message:error.message})
     }
}
const  cancelAppointments= async(req,res)=>{
    try {
       // const userId=req.userId
        const {appointmentId}=req.body

        const appointmentData= await appointmentModel.findById(appointmentId)
        if (!appointmentData) {
            return res.json({ success: false, message: 'Appointment not found' })
        }
     //    if(appointmentData.userId !==userId){
     //        return res.json({success:false,message:'unauthorized acess'})
     //    }
     if(appointmentData.cancelled){
          res.json({success:true, message:"appointment cancelled"})

     }
        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

        const{docId,slotDate,slotTime}= appointmentData

        const doctorData= await doctorModel.findById(docId)

        let slots_booked =doctorData.slots_booked

        slots_booked[slotDate]= slots_booked[slotDate].filter(e=>e !== slotTime)
        await doctorModel.findByIdAndUpdate(docId,{slots_booked})
        res.json({success:true, message:"appointment cancelled"})

    } catch (error) {
    console.log(error.message)
    res.json({success:false,message:error.message})
    }
}

const adminDash=async (req,res)=>{
     try{
          const users=await userModel.find({})
          const doctors=await doctorModel.find({})
          const appointments= await appointmentModel.find({}).populate('docData')

          const dashData ={
               Ddocs:doctors.length,
               usrs:users.length,
               appointment:appointments.length,
               appts:appointments.reverse().slice(0,5)
          }
          res.json({success:true,dashData})

     }catch(error){
     console.log(error.message)
    res.json({success:false,message:error.message})
     }
}

export  {addDoctor,adminLogin ,allDoctors,getAllDoctorsAdmin,cancelAppointments,adminDash}
