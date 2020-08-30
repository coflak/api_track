const mongoose=require('mongoose');
let Schema=mongoose.Schema;


let elementsSchema=new Schema({
    name:{
        type:String,
        require:[true,"Name is required"],

    },
    surname:{
        type:String,
        require:false,
        default:"without surname"
    },
    city:{
        type:String,
        require:[true,"City is required"],
    },

    email:{
        type:String,
        require:[true,"Email is required"],
    },

    created_at:{
        type:Date,
        require:[true,"Created at is required"],
        default:Date.now
    },
    user:{
        type:String,
        require:[true,"Name user is required"],
        
    },
    password:{
        type:String,
        require:[true,"Password is required"]
    },
    active:{
        type:Boolean,
        default:true

    }

   

})

module.exports=mongoose.model("User",elementsSchema);