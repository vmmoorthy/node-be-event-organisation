const mongoose = require('mongoose')
const schema = mongoose.Schema;

let comp_reg_Schema = new schema({
    payment_id: {
        type:String
    },
    person_id: {
        type: String
    },
    competition_id: {
        type: String
    }
},
{
    timestamps:true
})

competition_registration=mongoose.model('competition_registration',comp_reg_Schema)

module.exports=competition_registration