const mongoose=require("mongoose")

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        min:5
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
        min:5
    },
    profilePicture:{
        type:String,
        default:''
    },
    coverPicture:{
        type:String,
        default:''
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    desc:{
        type:String,
        default:"",
    },
    city:{
        type:String,
        max:50
    },
    from:{
        type:String,
        max:50
    }
},
{timestamps:true}

);

module.exports=mongoose.model('User',UserSchema)