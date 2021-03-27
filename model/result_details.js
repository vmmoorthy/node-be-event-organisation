const mongoose = require('mongoose')
const schema = mongoose.Schema;

let result_Schema = new schema({
    competition_registration_id: {
        type:String
    },
    result: {
        type: String,// values: first/ second/ third/ part(participated)
        required:true,
        default:"part"
    }
},
{
    timestamps:true
})

result_details=mongoose.model('result_detail',result_Schema)

module.exports=result_details