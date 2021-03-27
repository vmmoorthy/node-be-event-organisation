// const nodemailer = require("nodemailer");
const ejs = require("ejs");
// const path = require("path");

// let transporter = nodemailer.createTransport({
//   service: "gmail",
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: "dailyshopproj",
//     pass: "dailyshop123",
//   },
// });

let renderTemplate = (data) => {
  let mailHTML;
  // data=JSON.parse(data)
  console.log(data)
  // console.log("inside render");
  
  ejs.renderFile(
    __dirname+"\\invitation.ejs",
    {data},
    function (err, template) {
      if (err) {
        console.log("error in rendering template", err);
        return;
      }

      mailHTML = template;
    }
  )
  return mailHTML;
};

module.exports={renderTemplate}
// module.exports = {
//   transporter: transporter,
//   renderTemplate: renderTemplate,
// };
