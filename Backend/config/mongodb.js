import mongoose from 'mongoose'

const connectDB= async ()=>{
    mongoose.connection.on('connected',()=>console.log('Database connected'))
    await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`)//when connection will be established a new db will bw created named prescriptpo
    console.log('db created')
}
export default connectDB