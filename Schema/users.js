const mongoose = require('mongoose')

const userShcema=mongoose.Schema({
    name:{
        type:'string',
        required:true,

    },
    email:{
        type:'string',
        required:true,
    },
    password:{
        type:'string',
        required:true
    },
    phonNumber:{
        type:'number',
        required:true
    },
    address:{
        type:'string',
        
    },
    dateTime: {
        type: Date,
        default: Date.now,
      },
})

module.exports=mongoose.model('user',userShcema);