//require express server
const express = require('express')
//initialize the routing table
const router = express.Router();
const team_leader=require('../model/team_leader')
const competition_registration=require('../model/competition_registration')
const personModule=require('../model/persons_details')

router.get("/participant",(req,res)=>{
    team_leader.findOne({email:req.body.email},{competition_id:1}).then(function (success) {
        competition_registration.find({competition_id:success.competition_id}).then(success=>{
            
            let persons_id=[];
            success.forEach(person => {
                persons_id.push(person.person_id)
            }) 
            personModule.find({_id:{$in:persons_id}}).then(success=>{
                res.send(success)
            },(fail)=>{
                res.send({status:false})
            });

        })
  
    }, function (fail) {
        console.log('Error with login table')
        res.send({ status:false })
    })
})

/*
"email": "18BCA38@americancollege.edu.in"
*/








module.exports = router;