const mongoose = require('mongoose')
const schema = mongoose.Schema;

let paymentSchema = new schema({
    recipt_num: {
        type: String,
        index: true,
    },
    orderid:{
        type: String,
        index:true
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
        type: String,
        index:true
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