import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false, // Use TLS
  tls: {
    ciphers: 'SSLv3', // Set the desired SSL/TLS version here
  },
  auth: {
    user: 'chadbenny@outlook.com',
    pass: 'Chad4me1987!',
  },
});

// Email data
const mailOptions = {
  from: 'chadbenny@outlook.com',  // Sender's Hotmail email address
  to: 'evoex@superrito.com',             // Recipient's email address
  subject: 'Hello, World!',                // Email subject
  text: 'This is a test email.',           // Email content
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error sending email: ' + error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

