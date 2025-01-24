import nodemailer from "nodemailer";


//const email = process.env.NODEMAILER_CHURCH2_EMAIL;
//const pass = process.env.NODEMAILER_CHURCH2_PASS;

const email = process.env.NODEMAILER_FEEDBACK_EMAIL;
const pass = process.env.NODEMAILER_FEEDBACK_PASS;


export const transporter = nodemailer.createTransport({
  host: 'mail.gofamintpsogba.org',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: email,
    pass,
  },
});

export const mailOptions = {
  from: email,
  to: email,
};



/*
FOR GMAIL
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass,
  },
});
*/