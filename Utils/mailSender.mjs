const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
    },
});

// async..await is not allowed in global scope, must use a wrapper
async function mailSender(email, subject, template) {

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: `"Maddison Foo Koch 👻" <${process.env.USER_EMAIL}>`,
        to: email,
        subject: subject,
        html: template
    });

    console.log("Message sent: %s", info.messageId);
    return info;
}

export default mailSender