const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "mail.fanavaran.ca",
      service: "smtp",
      port: 465,
      secure: true,
      auth: {
        user: "test@fanavaran.ca",
        pass: "3ccc$#5@h`o1",
      },
    });

    await transporter.sendMail({
      from: "test@fanavaran.ca",
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};


module.exports = sendEmail;