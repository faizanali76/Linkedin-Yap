import { supabase } from "./db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const registerUser = async (email, password ) =>{
    try{

        const{data: existingUser} = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .maybeSingle()
        
            if(existingUser){
                return {success: false, error: "User Already Exist"}
            }
        
            const hashedPassword = await bcrypt.hash(password, 10);
        
            const {data: newUser, error} = await supabase
            .from('users')
            .insert([{email: email, password_hash: hashedPassword}])
            .select();
            if(error) throw error;
        
            return {success:true, message: "User Registered Successfully"}

    }
    catch(error){   
        console.error("Registration Error", error)
        return {success:false, error: "Database Error"}

    }

}


export const loginUser = async (email, password ) =>{

    try{
        const {data: existingUser} = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .maybeSingle()

    if(!existingUser) {
        return {success: false, error: "Unathorized User"}
    }

    const passwordMatched = await bcrypt
    .compare(password, existingUser.password_hash);

    if(!passwordMatched){
        return {success: false, error: "Email or Password Doesnt Match"}

    }


    const token = jwt.sign(
        {userId: existingUser.id},
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
    )

    return {success: true, token: token}

    }
    catch(error){
         console.error("Sign in Error", error)
         return {success: false, error: "Internal Server Error"}
    }
    
}