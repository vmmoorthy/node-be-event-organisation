const mongoose = require('mongoose')
const schema = mongoose.Schema;

let paymentSchema = new schema({
    recipt_num: {
        type: String,
        index: true,
    },
    orderid:{
        type: String,
    },
    amount: {
        type: Number, 
        required: true
    },
    paymentid: {
        type: String,
        index: true,
    },
    signature:{
        type: String
    },
    success_status: {
        type:Boolean,
        default:false
    }
},
{
    timestamps:true
})

paymentModel=mongoose.model('payment_details',paymentSchema)

module.exports=paymentModel