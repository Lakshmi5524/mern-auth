const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express=require("express")
const app=express();
const path=require('path')
const cors=require("cors")
const userRouter =require("./routes/users")
const authRoutes=require("./routes/auth")

//middleware
dotenv.config();
app.use(express.json())
app.use(cors());

app.use("/api/users",userRouter);
app.use("/api/auth",authRoutes);

app.use(express.static(path.join(__dirname,"build")))
app.get("/*",(req,res)=>{
    res.sendFile(path.join(__dirname,"build","index.html"))
});

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    
})
.then(()=>console.log('DB connected'))
.catch(err=>console.log('DB connetion Error',err))




const port =process.env.PORT||8080;
app.listen(port,()=>console.log(`Listen on port ${port}...`))
