import nodemailer from 'nodemailer';

export interface MailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export class Mailer {
  private transporter?: ReturnType<typeof nodemailer.createTransport>;

  constructor() {}

  async init() {
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      const testAccount = await nodemailer.createTestAccount();
      this.transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    }
  }

  async send(options: MailOptions) {
    if (!this.transporter) await this.init();

    const info = await this.transporter.sendMail({
      from: process.env.MAIL_FROM || 'ci-pipeline@example.com',
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });

    const preview = (nodemailer as any).getTestMessageUrl
      ? (nodemailer as any).getTestMessageUrl(info)
      : undefined;

    return { info, preview };
  }
}

export default Mailer;
