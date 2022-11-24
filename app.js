const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

app.use(express.json());

const from = process.env.from;
const pass = process.env.password;
const to = process.env.to;
const service = process.env.service; // e.g. gmail

app.post('/send', (req, res) => {
  const { sendTo, clientEmail, subject, message, name } = req.body;

  var transporter = nodemailer.createTransport({
    service,
    auth: {
      user: from,
      pass,
    },
  });

  var mailOptions = {
    from,
    to: sendTo,
    subject,
    text: `From: ${name} <${clientEmail}>\nSubject: ${subject} 📌\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(500).send('Something went wrong!');
    } else {
      res.status(200).send('Email sent successfully');
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
