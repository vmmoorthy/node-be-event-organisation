const mongoose = require('mongoose')
const schema=mongoose.Schema;
let adminSchema=new schema({
    name:{
        type:String,
        required:true
    },
    password: {
        type: String,
        require:true
    },
    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        index: true
    }
},
{
    timestamps:true
}
);

AdminModel = mongoose.model('AdminDetails', adminSchema);

module.exports = AdminModel;