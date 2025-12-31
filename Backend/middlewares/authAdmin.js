import jwt from 'jsonwebtoken'

const authadmin =async (req, res, next)=>{
    try{
        //the token is apperaently in headers and headers ki hoy/
        const {token}=req.headers
        if(!token){
            return res.json({success:false,message:'not authorized'})
        }
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)
        req.userId=token_decode.id 
        if(token_decode !== process.env.ADMIN_EMAIL +process.env.ADMIN_PASSWORD){
            return res.json({success:false,message:'not authorized2'})
        }
        next()
        //next ki kore?
    }catch(error){
        console.log(error.message)
              res.json({success:false,message:'error'})
        
    }

}
export default authadmin