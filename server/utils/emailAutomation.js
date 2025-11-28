const nodemailer = require('nodemailer');
const Newsletter = require('../models/Newsletter');

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false, // Use TLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

/**
 * Send newsletter to all active subscribers
 * @param {string} subject - Email subject
 * @param {string} htmlContent - HTML email content
 * @returns {Promise<Object>} - Send results
 */
async function sendNewsletter(subject, htmlContent) {
  try {
    // Get all active subscribers
    const subscribers = await Newsletter.find({ subscribed: true });

    if (subscribers.length === 0) {
      return {
        success: false,
        message: 'No active subscribers found',
        sentCount: 0,
      };
    }

    const transporter = createTransporter();
    let sentCount = 0;
    let failedCount = 0;
    const errors = [];

    // Send emails in batches to avoid overwhelming the server
    const batchSize = 50;
    for (let i = 0; i < subscribers.length; i += batchSize) {
      const batch = subscribers.slice(i, i + batchSize);

      const sendPromises = batch.map(async (subscriber) => {
        try {
          // Create personalized email
          const personalizedContent = htmlContent.replace(
            /{name}/g,
            subscriber.name || 'Subscriber'
          );

          const mailOptions = {
            from: `"Pastor Sola Olukoya Ministry" <${process.env.EMAIL_USER}>`,
            to: subscriber.email,
            subject: subject,
            html: personalizedContent,
            headers: {
              'List-Unsubscribe': `<${process.env.NEXT_PUBLIC_URL}/api/newsletter/unsubscribe/${subscriber._id}>`,
            },
          };

          await transporter.sendMail(mailOptions);
          sentCount++;
        } catch (error) {
          failedCount++;
          errors.push({
            email: subscriber.email,
            error: error.message,
          });
          console.error(`Failed to send to ${subscriber.email}:`, error.message);
        }
      });

      await Promise.all(sendPromises);

      // Small delay between batches
      if (i + batchSize < subscribers.length) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    return {
      success: true,
      message: `Newsletter sent successfully to ${sentCount} subscribers`,
      sentCount,
      failedCount,
      errors: errors.length > 0 ? errors : undefined,
    };
  } catch (error) {
    console.error('Error sending newsletter:', error);
    return {
      success: false,
      message: 'Failed to send newsletter',
      error: error.message,
    };
  }
}

/**
 * Send individual email
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} htmlContent - HTML email content
 * @returns {Promise<Object>} - Send result
 */
async function sendEmail(to, subject, htmlContent) {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Pastor Sola Olukoya Ministry" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId,
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: 'Failed to send email',
      error: error.message,
    };
  }
}

/**
 * Send welcome email to new subscriber
 * @param {string} email - Subscriber email
 * @param {string} name - Subscriber name
 * @returns {Promise<Object>} - Send result
 */
async function sendWelcomeEmail(email, name) {
  const subject = 'Welcome to Pastor Sola Olukoya Ministry Newsletter!';
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0c0c69 0%, #1a1a8f 100%); color: #fcba03; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #ffffff; padding: 30px; border: 2px solid #fcba03; border-top: none; border-radius: 0 0 10px 10px; }
        .button { background: #fcba03; color: #0c0c69; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold; margin: 20px 0; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to Our Newsletter!</h1>
        </div>
        <div class="content">
          <p>Dear ${name || 'Friend'},</p>
          <p>Thank you for subscribing to the Pastor Sola Olukoya Ministry newsletter!</p>
          <p>You'll receive:</p>
          <ul>
            <li>📖 Daily devotionals and inspirational messages</li>
            <li>📅 Updates on upcoming events and programs</li>
            <li>🎬 Live stream notifications</li>
            <li>📚 New book releases and teachings</li>
          </ul>
          <p>Stay connected and be blessed!</p>
          <a href="${process.env.NEXT_PUBLIC_URL}" class="button">Visit Our Website</a>
          <p>God bless you!</p>
          <p><strong>Pastor Sola Olukoya Ministry Team</strong></p>
        </div>
        <div class="footer">
          <p>If you wish to unsubscribe, click <a href="${process.env.NEXT_PUBLIC_URL}/api/newsletter/unsubscribe">here</a></p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail(email, subject, htmlContent);
}

/**
 * Send reply to contact form submission
 * @param {string} to - Recipient email
 * @param {string} subject - Reply subject
 * @param {string} message - Reply message
 * @returns {Promise<Object>} - Send result
 */
async function sendContactReply(to, subject, message) {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0c0c69 0%, #1a1a8f 100%); color: #fcba03; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #ffffff; padding: 30px; border: 2px solid #fcba03; border-top: none; border-radius: 0 0 10px 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Pastor Sola Olukoya Ministry</h2>
        </div>
        <div class="content">
          ${message}
          <br><br>
          <p>God bless you!</p>
          <p><strong>Pastor Sola Olukoya Ministry</strong></p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail(to, subject, htmlContent);
}

module.exports = {
  sendNewsletter,
  sendEmail,
  sendWelcomeEmail,
  sendContactReply,
};
