const mongoose = require('mongoose')
const schema = mongoose.Schema;

let competitionSchema = new schema({
    competition_name: String,
    max_mark: {
        type: Number,
        default: 100
    },
    price: {
         type: Number,
         required:true
    },
    rules_pdf_path: {
        type:String,
        default: null
    },
    f_prize:{
        type:String,
        default:null
    },
    s_prize:{
        type:String,
        default:null
    },
    t_prize:{
        type:String,
        default:null
    }
},
{
    timestamps:true
}
)

competitionModel=mongoose.model('competitions',competitionSchema)

module.exports=competitionModel