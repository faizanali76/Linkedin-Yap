import express from "express";
import YapRoutes from "./src/Routes/YapRoutes.js"
import AuthRoutes from './src/Routes/AuthRoutes.js'
import cors from "cors";
const app = express();

const PORT = 3000;
    
app.use(cors())
app.use(express.json())

app.use("/api", YapRoutes);
app.use("/api/auth", AuthRoutes)

app.get('/health', (req,res)=>{
    res.status(200).json({message: "Server is alive and yapping"})
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})