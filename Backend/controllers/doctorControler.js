import doctorModel from "../modules/doctorsModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../modules/appointmentModel.js"

// update availability
const changeAvailability = async (req,res)=>{
    //falling in love with arrow functions for some reason
    try{
        const {docId}= req.body 
        
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId,{available:!docData.available })
        res.json({success:true,message:'Availability changed'})
    }catch(error){
        console.log(error.message)
        res.json({success:false ,message:error.message})
    }
}

const doctorList= async(req, res)=>{
    const doctors = await doctorModel.find({}).select(['-password','-email'])

    res.json({success:true,doctors})
}

const doctorLogin= async(req,res)=>{
    try {
        const {email, password} =req.body

        const docData=await doctorModel.findOne({email})
        if(!docData){
            return res.json({success:false,message:'doctor not found'})

        }
        const isMatch = await bcrypt.compare(password,docData.password)
        if(isMatch){
            const token = jwt.sign({id:docData._id},process.env.JWT_SECRET)
            res.json({success:true,token})

        }else{
            res.json({success:false,message:'Invalid credentials'})
        }
    } catch (error) {
        console.log(error.message)
        res.json({success:false ,message:error.message})
    }
}
const appointmentsDoctor = async (req, res) => {
    try {

        const docId = req.docId
        const appointments = await appointmentModel.find({ docId })

        res.json({ success: true, appointments})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}
const completeAppointment =async(req,res)=>{
    try{
        const {appointmentId}=req.body
        await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true})
        res.json({ success: true,message:'appointment completed'})

    }catch(error){
       console.log(error)
       res.json({success:false, message:error.message}) 
    }
}
const dashBoard= async(req,res)=>{
   try{ const docId= req.docId
    const appointments = await appointmentModel.find({docId})
    let earning= 0
    let patients=[]
    appointments.map((item)=>{
        if(item.isCompleted||item.payment){
            earning+=item.amount
            }
        if(!patients.includes(item.userId)){
            patients.push(item.userId)
            }
        
        }
    )
    const dashBoard= {
            patients:patients.length,
            earnings:earning,
            appointments:appointments.length,
            latestAppointments:appointments.reverse().slice(0,5)
        }
    res.json({success:true,dashBoard})}
    catch(error){

    }
}

const docProfile= async(req,res)=>{
   try{
    const docId= req.docId
    const profile= await doctorModel.findById(docId).select('-password')
    res.json({success:true,profile})
}
    catch(error){
       console.log(error)
       res.json({success:false, message:error.message})
    }
}
const updateDocProfile= async(req,res)=>{
    try {
        const docId= req.docId
        const {address,fees, available}=req.body 
        await doctorModel.findByIdAndUpdate(docId,{address,fees, available})
         res.json({success:true,message:'Profile updated'})
    } catch (error) {
       console.log(error)
       res.json({success:false, message:error.message})        
    }
}
export {changeAvailability,doctorList,doctorLogin,appointmentsDoctor,completeAppointment,dashBoard,docProfile,updateDocProfile}