import { NodemailerProvider, EmailService, createRenderer } from '@muzammil328/services';
import { APP_CONFIG } from '@muzammil328/education-packages';
import { templateLoader } from '@/email/templateLoader';
import { config } from '@config/env.config';

const isProduction = config.NODE_ENV === 'production';

const provider = new NodemailerProvider({
  host: isProduction ? config.SMTP_HOST : 'localhost',
  port: isProduction ? 587 : 1025,
  secure: false,
  auth: isProduction ? { user: config.SMTP_USER!, pass: config.SMTP_PASS! } : undefined,
});

provider.verify().catch((err: any) => {
  console.warn(`[email] SMTP connection failed: ${err.message}. Server will still start, but emails won't be sent.`);
});

const renderer = createRenderer(templateLoader);

export const emailService = new EmailService(provider, renderer, {
  from: config.SMTP_FROM || APP_CONFIG.supportEmail,
  orgName: APP_CONFIG.company,
  supportEmail: APP_CONFIG.supportEmail,
});

export async function sendVerificationOtp({
  email,
  username,
  otp,
}: {
  email: string;
  username: string;
  otp: string;
}) {
  return emailService.send({
    to: email,
    subject: 'Growlearnhub verification code',
    template: 'generateVerificationCode',
    context: { username, otp, year: new Date().getFullYear() },
  });
}

export async function sendPasswordResetOtp({
  email,
  username,
  otp,
}: {
  email: string;
  username: string;
  otp: string;
}) {
  return emailService.send({
    to: email,
    subject: 'Growlearnhub password reset code',
    template: 'passwordResetCode',
    context: { username, otp, year: new Date().getFullYear() },
  });
}
