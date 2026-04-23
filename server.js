import express from "express";
import YapRoutes from "./src/Routes/YapRoutes.js"

const app = express();

const PORT = 3000;

app.use(express.json())

app.use("/api", YapRoutes);

app.get('/health', (req,res)=>{
    res.status(200).json({message: "Server is alive and yapping"})
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})