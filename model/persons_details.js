const mongoose = require('mongoose')
const schema = mongoose.Schema;

let personSchema = new schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        index: true
    },
    phone_no:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    institution:{
        type:String,
        required:true
    } 
},
{
    timestamps:true
})

personModule=mongoose.model('persons_details',personSchema)

module.exports=personModule