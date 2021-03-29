//require express server
const express = require('express')
//initialize the routing table
const router = express.Router();
const team_leader=require('../model/team_leader')
const competition_registration=require('../model/competition_registration')
const personModule=require('../model/persons_details')
const competition=require('../model/competition')


router.post('/login_validate', function (req, res) {
    team_leader.findOne({ email: req.body.email, password: req.body.pass }).then(function (success) {
        res.send({ success })
    }, function (fail) {
        res.send({ success: false })
    })
})


router.post('/loginValidate', function (req, res) {
    team_leader.findOne({email:req.body.email},{password:0}).then(function (success) {
        if(success!=null)
        res.send({success})
        else
        res.send({status:false})
    }).catch(function (fail) {
        console.log('Error while fetch data')
        res.send({status:false})
    })
})


router.post("/participant",(req,res)=>{
    team_leader.findOne({email:req.body.email},{competition_id:1}).then(function (success) {
        console.log(success)
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


router.put("/updateWinners",(req,res)=>{
    team_leader.findOne({email:req.body.email},{competition_id:1}).then(function (success) {
        console.log(success)
        competition.findByIdAndUpdate({_id:success.competition_id},
            req.body.winners).then(success=>{
                res.send(success)
            },(fail)=>{
                res.send({status:false})
            });

        })
  
    }, function (fail) {
        console.log('Error while update competition data')
        res.send({ status:false })
    })



router.post("/fetchWinners",(req,res)=>{
    team_leader.findOne({email:req.body.email},{competition_id:1}).then(function (success) {
        console.log(success)
        competition.findById({_id:success.competition_id}).then(success=>{
                res.send(success)
            },(fail)=>{
                res.send({status:false})
            });

        })
  
    }, function (fail) {
        console.log('Error while update competition data')
        res.send({ status:false })
    })






module.exports = router;