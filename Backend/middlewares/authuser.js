import jwt from 'jsonwebtoken'

const authuser =async (req, res, next)=>{
    try{
       
        const {utoken}=req.headers
        if(!utoken){
            return res.json({success:false,message:'not 1authorized'})
        }
        const token_decode = jwt.verify(utoken,process.env.JWT_SECRET)
        
        req.userId=token_decode.id 
        
        next()
        //next ki kore?
    }catch(error){
        console.log(error.message)
        res.json({success:false,message:error.message})
        
    }

}
export default authuser