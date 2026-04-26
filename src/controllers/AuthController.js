import { loginUser, registerUser } from "../services/AuthServices.js";


export const register = async(req,res)=>{
   try{
    const{email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({error:"Email or Password is Required"})

    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        return res.status(400).json({error:"Invalid Email Format"})

    }


    if(password.length<6){
        return res.status(400).json({error:"Password is Less than 6 words"})

    }

    const result = await registerUser(email, password)

    

   
    if(!result.success) {
        return res.status(400).json({error: result.error})
    }

    return res.status(200).json({
        success: true,
        message: result.message
    });


   }
   catch(error){
    console.error("Registration Error", error)
    return res.status(500).json({error:"Internal Server Error"});

   }
}

export const login = async (req, res)=>{

    try{
    const  {email, password} = req.body;

     if(!email || !password){
        return res.status(400).json({error:"Email or Password is Required"})

    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        return res.status(400).json({error:"Invalid Email Format"})

    }

    if(password.length<6){
        return res.status(400).json({error:"Password is Less than 6 words"})

    }

    const result = await loginUser(email, password)

    if(!result.success){
        return res.status(400).json({error: result.error})
    }

    if(result.success){
        return res.status(200).json({success:true, 
            message: "User Logged in",
            token: result.token,

        })
    }
    
    }


    catch(error){
         console.error("Sign in Error", error)
         return res.status(500).json({error:"Internal Server Error"});
    }
}