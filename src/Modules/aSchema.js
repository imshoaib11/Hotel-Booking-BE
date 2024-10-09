import mongoose from "./index.js";

const aSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Name is required']
    },
    email: {
        type: String,
        required:  [true,'Email is required'],
        unique: true,
        
    },
    password:{
        type: String,
        required: [true,'Password is required'],
        // minlength: 8
    },
    phone:{
        type: String,
        required: [true,'Phone number is required'],
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
    
},
   {
    collection: 'aa',
    versionKey: false
   })

   const aModel = mongoose.model('aa', aSchema);

   export default aModel;