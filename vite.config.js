import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"
import nodemailer from 'nodemailer'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const sendEmailMiddleware = (req, res, next) => {
    if (req.url === '/api/send-email' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', async () => {
        try {
          const { to, html, subject } = JSON.parse(body);
          
          if (!to || !html) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Missing to or html field' }));
            return;
          }

          const smtpHost = env.SMTP_HOST;
          const smtpPort = env.SMTP_PORT;
          const smtpUser = env.SMTP_USER;
          const smtpPass = env.SMTP_PASS;
          const smtpFrom = env.SMTP_FROM || 'noreply@signature-generator.local';

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
      });
    } else {
      next();
    }
  };

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'send-email-plugin',
        configureServer(server) {
          server.middlewares.use(sendEmailMiddleware);
        },
        configurePreviewServer(server) {
          server.middlewares.use(sendEmailMiddleware);
        }
      }
    ],
    optimizeDeps: {
      exclude: ["js-big-decimal"],
    },
  };
});
