const { json } = require('express');
var cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
//initialize express app
const app = express();
app.use(cors());
// const { createProxyMiddleware } = require('http-proxy-middleware');
// app.use(createProxyMiddleware({ 
//     target: 'http://localhost:3010/', //original url
//     changeOrigin: true, 
//     //secure: false,
//     onProxyRes: function (proxyRes, req, res) {
//        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
//     }
// }));
//connecting to the mongoose db
mongoose.connect('mongodb://localhost:27017/evt_org',
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    function (err) {
        if (err) {
            console.log('Error on connecting to mongodb')
            console.log(err)
        } else {
            // console.log('mongodb connected successfully')
            console.log("Database connected successfully");
            app.listen(process.env.port || 3010, function (err) {
                if (err) throw err;
                console.log('app is running on localhost')
        })
    }
})

mongoose.Promise = global.Promise
//using the body-parser as middleware to convert all the data in to JSON format

app.use(require('body-parser').json())

//using a middleware called demo for GET,POST,UPDATE,DELETE
//routing table
// app.use('/demo', require('./routes/demo'))

app.use('/', require('./routes/participant')) //user route

app.use('/admin',require('./routes/admin'))

app.use('/user', require('./routes/user'))


// app.use(function (err, req, res, next) {
//     try{if (err.keyPattern.mobile) {
//         // console.dir(req)
//         res.send({ err: "User already exist : " + err.keyValue.mobile 
//         // reqObj:req
//     })
//     } }catch(err) {
//         res.send({ err: "Uncatch error..." })
//     }
// })

app.use((req, res) => {
    res.status(404).send(JSON.stringify({ status: 404 }));
});
