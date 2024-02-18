// controllers/getemailController.js
const asyncHandler = require('express-async-handler');
const nodemailer = require('nodemailer');
const Email = require('../models/Email');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.FROM_EMAIL,
        pass: process.env.EMAIL_PASS,
    },
});

const submitContactForm = asyncHandler(async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const newContact = new Email({ name, email, message });
        await newContact.save();

        const userMailreply = {
            from: process.env.FROM_EMAIL,
            to: email,
            subject: 'Thank you for contacting us!',
            text: `Hi ${name},\n\nThank you for reaching out. We have received your message and will get back to you as soon as possible.\n\nBest regards,\n VISHWAJEEt`,
        }

        await transporter.sendMail(userMailreply);

        const myMailOptions = {
            from: process.env.FROM_EMAIL,
            to: process.env.TO_EMAIL,
            subject: 'New Contact Form Submission',
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        };

        await transporter.sendMail(myMailOptions);

        res.json({ success: true, message: 'Contact form submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = { submitContactForm };
