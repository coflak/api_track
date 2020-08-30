const mongoose =require('mongoose');

let Schema =mongoose.Schema;

let elementsSchema = new Schema({
    name_track:{
        type:String,
        require:[true,"Name track is requeried"],
    },

    artist:{
        type:String,
        require:[true,"Artist is requeried"],
    },

    albun:{
        type:String,
        require:false,
        default:'No albun'
    },

    año_albun:{
        type:String,
        require:false,
        default:"No albun"
    },

    aritis_remix:{
        type:String,
        require:false,
        default:"No remix"

    },
   
    image_url:{
        type:String,
        require:false,
        default:"without image"

    },

    

    created_at:{
        type:Date,
        require:[true,"'Created at' is requered"],
        default:Date.now,
    },

    active:{
        type:Boolean,
        default:true

    }

});

module.exports=mongoose.model("Track",elementsSchema)