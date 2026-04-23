import {generatePost} from "../services/YapServices.js";

export const handleGenerateRequest = async(req, res) =>{

    try{
        const {prompt} = req.body;
        if(!prompt){
            return res.status(400).json({error: "Some context is required to Generate Post"})

        }
        
        const response = await generatePost(prompt)

        return res.status(200).json({success: true, data: response})
    }
    catch(error){
        console.log("Error in generating post", error);
        return res.status(500).json({error: "Internal Server Error"})
    }

}