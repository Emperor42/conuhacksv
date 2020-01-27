const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  Name: {
    type: String,
    required: true
  },
  Time:{
      type:Number, 
      required:false
  },
  Date: {
    type: Date,
    default: Date.now
  },
  Status:{
      type:Boolean,
      required:true
  },
  Points:{
    type:Number,
    required:true,
    default:1
  },
    Tags:{
        //defie your tags here
        "CS":Boolean, "DEVOPS":Boolean, "AI":Boolean,
        required:false
    },
    Worker:{
        type: Number,
        required:true
    }
});

const UserSchema = new Schema(
    {
        name:{
            type: String,
            required: true
        },
        active:{
            type: Boolean,
            required: true
        },
        coname: {
            type: String,
            reqiored: true 
        },
        email:{
            type: String, 
            required:false
        },
        password:{
            type: String,
            required:true
        },
        code:{
            type: Number,
            required:true
        },
        points:{
            type: Number,
            required: true
        },
        tags:{
            //defie your tags here
            0:Boolean, 1:Boolean, 2:Boolean,
            required:false
        }
    }
) 

module.exports = mongoose.model("Tasks", TaskSchema);

module.exports = mongoose.model("Users", UserSchema);