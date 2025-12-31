import mongoose from "mongoose";
//mongo is a no sql db its stores data like json here wwe have made our schema
const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    speciality: { type: String, required: true },
    degree: { type: String, required: true },
    experience: { type: String, required: true },
    about: { type: String, required: true },
    available: { type: Boolean, default: true },
    fees: { type: Number, required: true },
    address: { type: Object, required: true },
    date: { type: Number, required: true },
    slots_booked: { type: Object, default: {} }
}, { minimize: false })//this line allows us to createthis empty object 

const doctorModel = mongoose.models.doctor|| mongoose.model('doctor',doctorSchema)//if there is an existing table use it else make a new table

export default doctorModel