import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    return;
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        console.error('Failed to parse body string:', e);
      }
    }

    const { to, html, subject } = body || {};

    if (!to || !html) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing to or html field' }));
      return;
    }

    // SMTP configuration from environment variables
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpFrom = process.env.SMTP_FROM || 'noreply@signature-generator.local';

    let transporter;
    let testAccount = null;

    if (smtpHost && smtpUser && smtpPass) {
      transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(smtpPort || '587', 10),
        secure: smtpPort === '465',
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });
    } else {
      testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    }

    const mailOptions = {
      from: smtpHost && smtpUser && smtpPass ? smtpFrom : `"Test Signature" <${testAccount.user}>`,
      to: to,
      subject: subject || 'Your Email Signature Test',
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);
    
    const responseData = {
      messageId: info.messageId,
      success: true,
    };

    if (testAccount) {
      const previewUrl = nodemailer.getTestMessageUrl(info);
      responseData.previewUrl = previewUrl;
      responseData.isTestAccount = true;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(responseData));
  } catch (error) {
    console.error('Error sending email:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: error.message || 'Failed to send email' }));
  }
}
