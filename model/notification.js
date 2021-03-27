const mongoose = require('mongoose')
const schema = mongoose.Schema;

let notificationSchema = new schema({
    message: {
        type:String,
        required:true
    },
    from: {
        type: String,
        required: true
    } 
},
{
    timestamps:true
})

notificationModule=mongoose.model('notification',notificationSchema)

module.exports=notificationModule