import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export const sendEmail = async (to: string, subject: string, body: string): Promise<void> => {
    const transport = nodemailer.createTransport({
        host: 'mail.heritagecoastline.com',
        port: 465,
        /* 
          setting service as 'gmail' is same as providing these setings:
          host: "smtp.gmail.com",
          port: 465,
          secure: true
          If you want to use a different email provider other than gmail, you need to provide these manually.
          Or you can go use these well known services and their settings at
          https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json
      */
        auth: {
            user: 'admin@heritagecoastline.com',
            pass: '@heritagecoastline.com',
        },
    });

    const mailOptions: Mail.Options = {
        from: 'admin@heritagecoastline.com',
        to,
        // cc: email, (uncomment this line if you want to send a copy to the sender)
        subject,
        text: body,
    };
    // Implementation for sending email
    try {
        // Example: Using a hypothetical email service
        const mail = await transport.sendMail(mailOptions)

        console.log('Email sent successfully', mail);
    } catch (error) {
        console.error('Failed to send email:', error);
    }
};