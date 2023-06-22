const connection = require("./connection")
const cors=require("cors")
const express=require("express")
const { userRouter } = require("./Routes/user.routes")
const { userDataRouter } = require("./Routes/userData.route")
const { auth } = require("./Controllers/auth..middleware")
const app=express()

app.use(express.json())
app.use(cors())

app.use("/user",userRouter)
app.use("/task",auth,userDataRouter)


app.get("/",(req,res)=>{
    res.send("hi")
})

app.listen(8080,async(req,res)=>{
 try {
    await connection
    console.log("connected to DB")
 } catch (error) {
console.log(error)
console.log("no DB")    
 }
console.log("PORT 8080")

})