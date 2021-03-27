const mongoose = require('mongoose')
const schema = mongoose.Schema;

let invitaionSchema = new schema({
    name: String,
    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        unique:true
    }
},
{
    timestamps:true
})

invitationModel=mongoose.model('invitation',invitaionSchema)

module.exports=invitationModel