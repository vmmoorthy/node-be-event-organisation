const invitaionModel = require('../model/invitation')

const getInvitee=(req,res)=>{
    invitaionModel.find({},{email:1,name:1,_id:0})
    .then((data)=>{ return res.send(data) })
    .catch(fail=>{return res.send({ error: "Error while insertion" })})
}

module.exports={
    getInvitee
}