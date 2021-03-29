const mongoose = require('mongoose')
const Schema= mongoose.Schema;

const team_leader_schema=new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required field"]
        },
        email: {
            type: String,
            required: true,
            match: /.+\@.+\..+/,
            index: true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        competition_id:{
            type:String,
            required:true
        }
    },
    {
        timestamps:true
    }
)

const team_leader=new mongoose.model("team_leader",team_leader_schema);
module.exports=team_leader;