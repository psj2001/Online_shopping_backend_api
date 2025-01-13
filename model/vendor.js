const mongoose = require('mongoose');

const vendorSchema = mongoose.Schema({
    fullName:{
        type:String,
        require:true,
        trim:true
    }, 
    email:{
        type:String,
        require:true,
        trim:true,
        validate:{
            validator:(value)=>{
              const   result = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return result.test(value);
            },
            message : "Please enter a valid email address",                                             
        }
    },
    state:{
        type:String,
       default:"",
    }, 
    city:{
        type:String,
       default:"",
    },
    locality:{
        type:String,
        default:"",
    },
    role:{
        type:String,
        default:"vendor",
    },
    password:{
        type:String,
        require:true,
        trim:true,
        validate:{
            validator:(value)=>{ 
                //check if passsword is  at least 8 characters long 
                return value.length >=8; 
            },
            message:"Password must  be at least 8 characters long"
        }
    }
});

const Vendor = mongoose.model("Vendor", vendorSchema);
module.exports= Vendor; 