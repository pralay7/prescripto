// register user
import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../modules/userModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../modules/doctorsModel.js'
import appointmentModel from '../modules/appointmentModel.js'
import razorpay from 'razorpay'
const registerUser= async(req,res)=>{
    try{
        const {name, email, password}= req.body

        if(!email ||!name ||!password){
            return res.json({success:false, message:'missing details'})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false, message:'invalid email'})
        }
        if(password.length<8){
            return res.json({success:false, message:'set strongerr [assword'})
        }
        const salt = await bcrypt.genSalt(10)//tales values between 5 -15
        const hashedPass= await bcrypt.hash(password,salt)

        const userData= {
            name,
            email,
            password:hashedPass
        }
        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET) 
        
        return res.json({success:true, token})

    }catch(error){
         return res.json({success:false, message:error.message})
    }


}

const userLogin = async (req,res)=>{
   try{
        const {email,password}= req.body
        const user = await userModel.findOne({email})
   
        if(!user){
             return res.json({success:false,message:'User not found'})
             }
        const isMatch = await bcrypt.compare(password,user.password)
        if(isMatch){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:'Invalid credentials'})

        }
            
        }catch(error)
       {
        console.log(error.message)
         res.json({success:false,message:error.message})
   
       }


}
const getUserData= async(req,res)=>{
    try{
        const userId= req.userId
        const user = await userModel.findById(userId).select('-password')
        res.json({success:true,user})
    }catch(error){
         console.log(error.message)
         res.json({success:false,message:error.message})
   
    }
}
const updateProfile= async(req, res)=>{
   try{ 
    const userId=req.userId
    const{ name ,phone,address, dob,gender}=req.body
    const image = req.file
    console.log(userId)
    if(!name||!phone ||!dob ||!gender){
        return res.json({success:false,message:"Data missing"})
    }
    await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})
    if(image){
        const imageUpload= await  cloudinary.uploader.upload(image.path,{resource_type:'image'})
        const imageUrl =imageUpload.secure_url
        await userModel.findByIdAndUpdate(userId,{image:imageUrl})
    }
     res.json({success:true,message:"profile updated"})
    }catch(error){ 
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}
const bookSlot =async(req,res)=>{
   const userId=req.userId
   
   const { docId, slotDate, slotTime } = req.body

const docData = await doctorModel.findById(docId).select('-password')

if (!docData.available) {
    return res.json({success:false, message: 'Doctor not available'})
}

let slots_booked = docData.slots_booked

// checking for slot availablity
if (slots_booked[slotDate]) {
    if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({success:false, message: 'Slot not available'})
    } else {
        slots_booked[slotDate].push(slotTime)
    }
} else {
    slots_booked[slotDate] = []
    slots_booked[slotDate].push(slotTime)
}
const userData = await userModel.findById(userId).select('-password')


delete docData.slots_booked

const appointmentData = {
    userId,
    docId,
    userData,
    docData,
    amount: docData.fees,
    slotTime,
    slotDate,
    date: Date.now()
}

const newAppointment = new appointmentModel(appointmentData)
await newAppointment.save()

await doctorModel.findByIdAndUpdate(
    docId, 
    { $set: { slots_booked: slots_booked } } 
)
res.json({success:true, message:"slot booked"})

}
const listAppointment = async(req,res)=>{
    try {
        const userId = req.userId
        const appointment= await appointmentModel.find({userId})
       // console.log(appointment)
        res.json({success:true,appointment})
    } catch (error) {
    console.log(error.message)
        res.json({success:false,message:error.message})
    }
}
const  cancelAppointments= async(req,res)=>{
    try {
        const userId=req.userId
        const {appointmentId}=req.body

        const appointmentData= await appointmentModel.findById(appointmentId)
        if (!appointmentData) {
            return res.json({ success: false, message: 'Appointment not found' })
        }
        if(appointmentData.userId !==userId){
            return res.json({success:false,message:'unauthorized acess'})
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
const razorpayInstance= new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})

const paymentRazorpay= async(req,res )=>{
    
    try {

        const{appointmentId}=req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        if(!appointmentData||appointmentData.cancelled){
           return(res.json({success:false, messages:"appointment not found"})) 
        }
        
        const options = {
            amount:appointmentData.amount*100,
            currency:process.env.CURRENCY,
            receipt:appointmentId,
        }
    
        const orders = await razorpayInstance.orders.create(options)
        res.json({success:true,orders})
        
    } catch (error) {
     console.log(error.message)
    res.json({success:false,message:error.message})
    }


}

const verifyPayment=async (req,res)=>{
   
   try{ 

    const {n} = req.body
    const data =  await razorpayInstance.orders.fetch(n)
    if(data.status==='paid'){
        await appointmentModel.findByIdAndUpdate(data.receipt,{payment:true})
        res.json({message:"payment succesful",success:true})
    }
    else{
        res.json({message:"payment failed",success:false})
    } 
   
    }
    catch(error){
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}

export {registerUser, userLogin,getUserData,updateProfile,bookSlot,listAppointment,cancelAppointments,paymentRazorpay,verifyPayment}