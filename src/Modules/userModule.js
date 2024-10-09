import { validateEmail, validatePhone } from "../Common/validations.js";
import mongoose from "./index.js";

const userSchema = new mongoose.Schema({
    userId:{
        type: Number,
        required: [true,'User Id is required'],
        unique: true,
        default: 0
    },
    name: {
        type: String,
        required: [true,'Name is required']
    },
    email: {
        type: String,
        required:  [true,'Email is required'],
        unique: true,
        validate: {
            validator: validateEmail,
            message: props=> `${props.value} is not a valid email`
        }
    },
    password:{
        type: String,
        required: [true,'Password is required'],
        // minlength: 8
    },
    phone:{
        type: String,
        required: [true,'Phone number is required'],
        validate:{
            validator: validatePhone,
            message: props=> `${props.value} is not a valid phone number`
        }
    },
    role:{
        type: String,
        enum: ['User', 'Admin'],
        required: [true,'Role is required'],
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    profile:{
        type: String,
        default: null
    },
    resetToken:{
        type: String,
        default: null
    }
    
},
   {
    collection: 'Users',
    versionKey: false
   })

   const userModel = mongoose.model('Users', userSchema);

   export default userModel;