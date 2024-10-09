import userModel from "../Modules/userModule.js";
import Counter from "../Modules/counterModule.js"
import auth from "../Common/auth.js";
import nodemailer from "nodemailer"

const getUsers = async(req,res) => {
    try{
        let users = await userModel.find({},{password:0});

    res.status(200).send({message: "Users Fetched successfully", data: users});
    }
    catch(error){
        res.status(500).send({error: error.message || "Internal Server Error"});
    }
    
}

const createUser = async (req, res) => {
    try{
        let user = await userModel.findOne({email: req.body.email})
      
        if(!user){
            req.body.password = await auth.hashedPassword(req.body.password)
            const counter = await Counter.findOneAndUpdate(
                { sequenceName: 'userId' },
                { $inc: { sequenceValue: 1 } },
                { new: true, upsert: true }  // upsert: true creates the document if it doesn't exist
            );

            req.body.userId = counter.sequenceValue
            await userModel.create(req.body)
            res.status(200).send({message: "User created successfully"})
        } 
        else
            res.status(401).send({message: `${req.body.email} already exists`})
    }
    catch(error){
        res.status(500).send({error: error.message || "Internal Server Error"});
    }
}

const loginUser = async (req, res) => {
    try{
        let user = await userModel.findOne({email: req.body.email})
        
        if(user){
            if(await auth.hashCompare(req.body.password, user.password)){
                let payload = {
                    id: user._id,
                    userId: user.userId,
                    userName : user.name,
                    email: user.email,
                    role: user.role,
                    img: user.profile,
                    phone: user.phone
                }
                let token = await auth.createToken(payload)
                // console.log(token)
                res.status(200).send({message: "Login Successfull",token,role:user.role,userName: user.name, userId: user.userId,
                                                                    email:user.email, phone:user.phone, img:user.profile})
            }
            else{
                res.status(403).send({message: "Incorrect Password"})
            }
        }
        else{
            res.status(403).send({message: "User not found"})
        }
    }
    catch(error){
        res.status(500).send({error: error.message || "Internal Server Error"});
    }
}

const sendLink = async(req,res) =>{
    const {email} = req.body;
    const user = await userModel.findOne({email: email}); 

    if(!user){
        res.status(400).send({message: "User Doesnot Exists"})
    }

    const token = Math.random().toString(36).slice(-8)
    user.resetToken = token
    user.save()


    
    //localhost:5173/reset
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'shoaib7337r.k.o@gmail.com',
          pass: 'tqvx raby wini zbpy'
        }
      });
      
      var mailOptions = {
        from: 'shoaib7337r.k.o@gmail.com',
        to: user.email,
        subject: 'Password Reset',
        text: `Your token is ${token} Click on the link https://main-reset.netlify.app and enter your token and your reset your password`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          res.status(500).send({
            message: error.message || "Internal Server Error"
          })
        } else {
          res.status(201).send({
            message: `Link sent to email: ${user.email}`
          })
        }
      });
}

const resetPassword = async(req,res) =>{
    try{
        const {token} = req.body
        
        const user = await userModel.findOne({resetToken:token})
        const {newPassword} = req.body

        if(!user){
            res.status(404).send({
                message: "Invalid Token"
            })
        }
        // if(!newPassword){
        //     res.status(404).send({
        //         message: "Please enter the New Password"
        //     })
        // }
        else{
            user.resetToken = null
            const hashedPassword = await auth.hashedPassword(newPassword)

            user.password = hashedPassword
           
            user.save()

            res.status(201).send({
                message: "Password Reset Successfull"
            })
        }
            
            

            
    }
    catch(error){
        res.status(500).send({
            message: error.message || "Internal Server Error"
        })
    }
}

export default {
    getUsers,
    createUser,
    loginUser,
    sendLink,
    resetPassword
 
}
