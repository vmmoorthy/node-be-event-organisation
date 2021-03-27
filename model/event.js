const mongoose = require('mongoose')
const schema = mongoose.Schema;

let eventSchema = new schema({
    event_name: String,
    start_date: {
        type: String,
        default: new Date()
    },
    rules_link :String,
    place: String,
    description: String
},
{
    timestamps:true
})

eventModel=mongoose.model('events',eventSchema)

module.exports=eventModel