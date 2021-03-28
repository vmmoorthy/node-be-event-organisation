var mail = require('nodemailer');
//require express server
const express = require('express')
//initialize the routing table
const router = express.Router();
// var multer  = require('multer')
// var upload = multer({ dest: 'uploads/' })
//import file system to read html for send mail
// const fs=require('fs')
const AdminModel = require('../model/admin_details')
const invitaionModel = require('../model/invitation')
const eventModel = require('../model/event')
const competitionModel = require('../model/competition')
const team_leader=require('../model/team_leader')
const nodemailer=require('../mailer_module/nodemailer')
const { getInvitee }=require('../controllers/admin')
const notificationModule=require('../model/notification')

router.post('/createAdminUser', function (req, res) {
    AdminModel.create(req.body)
    .then(function (success) {
        console.log('data inserted successfully')
        res.send(JSON.stringify({status:true,success}))
    })
    .catch((fail)=>{
        console.log('Error while insertion')
        res.send({ error: "Error while insertion" })
    })
})

/*
    name:"Hover Admin",
    password: "hover123",
    email: "hover2021@gmail.com"
*/


router.post('/createEvent', function (req, res) {
    eventModel.create(req.body).then(function (success) {
        console.log('data inserted successfully')
        res.send(JSON.stringify({status:true}))
    })
    .catch(function (fail) {
        console.log('Error while insertion')
        res.send({ error: "Error while insertion" })
    })
})

/*
createEvent
{
    "event_name": "Hover",
    "start_date": "25/03/2000",
    "rules_link" : "drive_link",
    "place": "The American college, Madurai", 
    "description": "Only for computer stream students"
}

*/

router.get('/viewEvent',(req,res)=>{
    eventModel.find().then(resp=>res.send(resp),rej=>res.status(500).send(rej))
    .catch(err=>{
        console.log(err);
        res.status(500).send({err:"There is an error"})
    })
})


router.post('/addCompetition', function (req, res) {
    
    competitionModel.create(req.body.competition).then(function (success) {
        console.log('data inserted successfully')
        req.body.team_leader.competition_id=success._id;
        team_leader.create(req.body.team_leader)
        .then((success)=>{
            console.log("team leader has added to the ");
            res.send(JSON.stringify({status:true}))
        }).catch((fail)=>{
            res.send({ error: "Error while insertion" })
        })
    })
    .catch(function (fail) {
        console.log('Error while insertion')
        res.send({ error: "Error while insertion" })
    })
})

/*
{
    "competition":{
        "competition_name": "WEB development",
        "max_mark": 100,
        "price": 150,
        "rules_pdf_path": "drive _link"
    },
    "team_leader":{
        "name": "Moorthy",
        "email": "18BCA135@americancollege.edu.in",
        "password":"hover123"
        
    }
}
*/

router.get('/viewCompetition',(req,res)=>{
    var comp_data=[];
    var count=1;
    competitionModel.find().then(resp=>{
        
            resp.forEach(val=>{
                // console.log(val)
                team_leader.findOne({competition_id:val._id}).then(team_val=>{
                    var comp={
                        max_mark: val.max_mark,
                        rules_pdf_path: val.rules_pdf_path,
                        f_prize: val.f_prize,
                        s_prize: val.s_prize,
                        t_prize: val.t_prize,
                        _id: val._id,
                        competition_name: val.competition_name,
                        price: val.price,
                        createdAt: val.createdAt,
                        updatedAt: val.updatedAt,
                        team_leader: team_val
                    }
                    console.log(comp_data);
                    comp_data.push(comp)
                    if(resp.length==count++)
                    res.send(comp_data)
                })
            })
    },rej=>res.status(500).send(rej))
    .catch(err=>{
        console.log(err);
        res.status(500).send({err:"There is an error"})
    })
})

router.get('/viewCompetition/:id',(req,res)=>{
    competitionModel.findOne({_id:req.params.id}).then(resp=>res.send(resp),rej=>res.status(500).send(rej))
    .catch(err=>{
        console.log(err);
        res.status(500).send({err:"There is an error"})
    })
})


router.post('/login', function (req, res) {
    AdminModel.findOne({email:req.body.email,password:req.body.password}).then(function (success) {
        if(success!=null){
        res.send({success})
        }
        else
        res.send({status:false})
    }).catch(function (fail) {
        console.log('Error while fetch data')
        res.send({status:false})
    })
})
/*
{
    "email": "hover2021@gmail.com",
    "password":"hover123"
}
*/

router.post('/loginValidate', function (req, res) {
    AdminModel.findOne({email:req.body.email},{password:0}).then(function (success) {
        if(success!=null)
        res.send({success})
        else
        res.send({status:false})
    }).catch(function (fail) {
        console.log('Error while fetch data')
        res.send({status:false})
    })
})
/*
{
    "email": "hover2021@gmail.com"
}
*/



router.post('/Invitee', function (req, res) {

    invitaionModel.create(req.body).then(function (success) {
        console.log('data inserted successfully')
        res.send({"success":true})
    }).catch(function (fail) {
        console.log('Error while insertion')
        res.send({ error: "Error while insertion" })
    })
})

/*
{
    "name": "VMM",
    "email": "devvmmoorthy@gmail.com"
}
*/





router.get('/Invitee',getInvitee)

// router.get('/',(req,res)=>{
//     res.redirect('/index.html')
// })
// router.get('/mail',(req,res)=>{
//     res.redirect('/mail.html')
// })

router.post('/sendInvitation',function(req,res){
    console.log('inside send mail')
    invitaionModel.find({},{email:1,name:1,_id:0}).then((data)=>{
    
        console.log('inside invitaion model')
        var emaillist="18bca135@americancollege.edu.in";//all mail send to this mail for testing purpose
        data.forEach(element => {
            emaillist+=","+element.email
        });
        
        console.log('emails:'+emaillist)
let competition_details={
    title:req.body.title,
    link:req.body.rules_link,
}
        competitionModel.find({}, { competition_name: 1, price: 1 })
        .then((success) => { competition_details.competition=success;
            // let html_page=nodemailer.renderTemplate(competition_details)
            // html_page.then(success=>{ console.log(success); return success},(fail)=>console.log(fail))
        mail_details = {
            from: 'ttemp1094@gmail.com',
            to: emaillist,
            subject: 'Hover Invitation from The American College',
            text: req.body.title,
            html: nodemailer.renderTemplate(competition_details)
            // .then(success=>console.log(success)).catch(fail=>console.log(fail))
            // fs.readFileSync(__dirname+"/hover.html",'utf-8',(err,data)=>{
            //     if(err){ console.log("error in read file")}
            //     // buf=Buffer.from(data);
            //     console.log('inside hover.html read function')
            //     return data;
            // })
        }
        mailer = mail.createTransport({
            service: 'gmail',
            auth: {
                user: 'ttemp1094@gmail.com',
                pass: '6yL{A9q9Ab%D4X'
            }
        });
        mailer.sendMail(mail_details, function (err, result) {
            if (err) {
                console.log('inside mailsend err')
                console.log(err)
                res.send({status:false})
            } else {
                console.log("Mail sent: " + result.response)
                res.send(result.response)
                }
            })
        // res.send(mail)
    },(err)=>{
        console.log(err);
        console.log("exited from find function");
        res.send({status:false})})
}).catch((fail)=>console.log("error while fetch competition data"+fail))
})


/*
{
    "title":"Hover",
    "rules_link":"drive link"
}
*/


router.post("/sendNotification",(req,res)=>{
    notificationModule.create(req.body)
    .then((success)=>{
        personModule.find({},{email:1,name:1,_id:0}).then((data)=>{
            console.log('inside notification module')
            var emaillist="18bca135@americancollege.edu.in";//all mail send to this mail for testing purpose
            data.forEach(element => {
                emaillist+=","+element.email
            })
        

        mail_details = {
            from: 'ttemp1094@gmail.com',
            to: emaillist,
            subject: 'Hover Notification - '+req.body.from,
            text: req.body.message,
        }
        mailer = mail.createTransport({
            service: 'gmail',
            auth: {
                user: 'ttemp1094@gmail.com',
                pass: '6yL{A9q9Ab%D4X'
            }
        });
        mailer.sendMail(mail_details, function (err, result) {
            if (err) {
                console.log('inside mailsend err')
                console.log(err)
                res.send({status:false})
            } else {
                console.log("Mail sent: " + result.response)
                res.send({status:true})
                }
            })
        
    },(fail)=>{
        console.log("error in adding notification");
        res.status(500).send({status:false})
    })})
    .catch((fail)=>{
        console.log("error in send notification mail");
        res.status(500).send({status:false})
    })
})


/*
{
    "message": "come to main hall",
    "from": "co-ordinator bug war competition" 
}
*/

module.exports = router;