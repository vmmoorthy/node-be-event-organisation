//require express server
const express = require('express')
//initialize the routing table
const router = express.Router();
const personModule = require('../model/persons_details')
const paymentModel = require('../model/payment_details')
const competition_registration = require('../model/competition_registration')
const notificationModule=require('../model/notification')
const competitionModel = require('../model/competition')
const Razorpay = require('razorpay')



var instance = new Razorpay({ key_id: 'rzp_test_H0l7ruuVdzWaFR', key_secret: 'oM28EUCTvyGkJR3Ar6PjfNBH' })



router.get('/competition_details', (req, res) => {
    competitionModel.find({}, { competition_name: 1, price: 1 }).then((success) => {
        res.send({ success })
    })
})


router.post('/validate', function (req, res) {
    personModule.findOne({ email: req.body.email }).then(function (val) {

        res.send(val)
    }).catch(function (fail) {
        console.log('Error fetching data /validate')
        res.send({ status: false })
    })
})

router.post('/login_validate', function (req, res) {
    personModule.findOne({ email: req.body.email, password: req.body.pass }, { email: 1 }).then(function (success) {
        res.send({ success, status: true })
    }, function (fail) {
        res.send({ status: false })
    })
})

router.post('/signup', function (req, res) {
    personModule.create(req.body).then(function (success) {
        console.log('data inserted successfully')
        res.send({ status: true })
    }, function (fail) {
        console.log('Error while insertion')
        res.send({ status: false })
    })
})

/*
{
    "name": "test person1",
    "email": "person1@gm.com",
    "phone_no":9876543210,
    "password":"hover123",
    "institution":"The AMC" 
}
*/

router.post('/paymentSuccess', function (req, res) {
    // console.log(req)
    console.log(req.body)
    // res.send(req.body)
    personModule.findOne({ email: req.body.partEmail }).then(resp => {
        console.log('person find success')
        console.log(resp)
        competition_registration.create({ payment_id: req.body.razorpayPaymentId, person_id: resp._id, competition_id: req.body.compet_id }).then(function (success) {
            console.log('competition registered successfully')
            console.log(success);
            paymentModel.findOneAndUpdate({ orderid: req.body.order_id }, { paymentid: req.body.razorpayPaymentId, signature: req.body.razorpaySignature, success_status: true }).then(function (success) {
                console.log('payment Success')
                console.log(success);
                res.send({ success })
            }, function (fail) {
                console.log('Error while getting success payment')
                res.status(500).send({ status: false })
            })
            // res.send(success)
        }, function (fail) {
            console.log('Error while insertion')
            res.status(500).send({ error: "Error while insertion" })
        })


    }, fail => {
        console.log("Unable to find the person" + fail)
        res.status(500).send({ err: "Unable to find the person" })
    })
})


router.post('/payment', function (req, res) {
    //creating a id for order id using amount alone
    paymentModel.create({ amount: req.body.amount }).then(function (success) {
        console.log('amount inserted into payment_details successfully')
        // res.send(success)

        //razorpay integration
        var options = {
            amount: req.body.amount * 100,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "rcptid_" + success._id
        };
        instance.orders.create(options, function (err, order) {
            if (err) console.log(err)

            paymentModel.findByIdAndUpdate({ _id: success._id }, { "orderid": order.id, "recipt_num": order.receipt }).then((success) => {
                console.log(req.body);
                res.send({ status: true, order: order })
                //participateModel.create({ person_id: req.body.email, competition_id: req.body.competition_id }).then((success) => res.send({ status: true, order: order }), (fail) => { console.log('participate Model create is getting error');
                // res.send({ status: false })})
            }, (fail) => {
                console.log('paymentModel findBy and update is getting error')
                res.send({ status: false })
            })
        });

    }, function (fail) {
        console.log('Error while insertion')
        res.send({ error: "Error while insertion" })
    })

})


// router.post('/register_competition', function (req, res) {

// })

router.post('/registered_competition', (req, res) => {

    console.log(req.body)
    // res.send(req.body)
    personModule.findOne({ email: req.body.email })
        .then(resp => {
            console.log('person find success')
            console.log(resp)
            competition_registration.find({ person_id: resp._id },{_id:0,competition_id:1})
                .then(function (success) {
                    competitionModel.find({_id:success.map((data)=>{return data.competition_id})}).then(resp=>{
                        console.log(resp)
                        res.send(resp)
                    },fail=>{
                        console.log(fail)
                        res.send(fail)
                    })
                }, function (fail) {
                    console.log("can't find competition registration")
                    res.status(500).send({ error: "can't find competition registration" })
                })


        }, fail => {
            console.log("Unable to find the person" + fail)
            res.status(500).send({ err: "Unable to find the person" })
        })
})

router.get('/notification',(req,res)=>{
    notificationModule.find().then(resp=>res.send(resp),rej=>res.send(rej))
})

module.exports = router