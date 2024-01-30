import nodemailer from 'nodemailer'


// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other services like 'smtp.gmail.com' for more control
    auth: {
        user: 'medicare2511@gmail.com', // Your Gmail email address
        pass: 'xqwr abql vkoj lmlv' // Your Gmail password or an application-specific password
    }
});

// Function to send an email
const sendEmail = async (to, subject, text) => {
    try {
        // Send mail with defined transport object
        const info = await transporter.sendMail({
            from: 'medicare2511@gmail.com',
            to,
            subject,
            text
        });

        console.log('Email sent: ', info.messageId);
        return true;
    } catch (error) {
        console.error('Error sending email: ', error);
        return false;
    }
};
 export default sendEmail

