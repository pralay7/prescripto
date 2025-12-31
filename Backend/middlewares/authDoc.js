import jwt from 'jsonwebtoken'

const authDoc =async (req, res, next)=>{
    try{
       
        const {dtoken}=req.headers
        if(!dtoken){
            return res.json({success:false,message:'not 1authorized'})
        }
        const token_decode = jwt.verify(dtoken,process.env.JWT_SECRET)
        
        req.docId=token_decode.id 
        
        next()
        //next ki kore?
    }catch(error){
        console.log(error.message)
        res.json({success:false,message:error.message})
        
    }  

}
export default authDoc