const nodemailer = require("nodemailer");

// Create a transporter for SMTP
const hostIP = "192.168.137.1".trim(); // removes spaces

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email", // no leading/trailing spaces
  port: 587,   // your SMTP port
  secure: false,
  auth: {
    user: "smitt533@gmail.com",
    pass: "xrqvslrnngqnosux",
  },
});

const sendEmail = async() => {
  try {
  await transporter.verify(async function(err,success){
    if(err){
        console.log("getting the error while connecting the server !",err);
    }else{  
       const info = await transporter.sendMail({
      from: ' "smit trivdi" <smitt533@gmail.com>', // sender address
      to: "smitt533@gmail.com", // list of receivers
      subject: "Hello", // Subject line
      text: "You are Successfully registered at youtube!", // plain text body
      html: "<b> Thank You ! </b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        console.log("Server is ready to take our messages");
    }
    
});

  } catch (err) {
    console.error("Error while sending mail", err);
  }
}

module.exports = {sendEmail};