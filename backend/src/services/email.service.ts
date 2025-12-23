/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

/**
 * Strong typing for resume user
 */
interface ResumeUser {
  fullName: string;
  email: string;
  phone?: string;
  referredBy?: string;
  education?: string;
  experience?: string;
}

@Injectable()
export class EmailService {
  private readonly transporter: Transporter;
  private readonly fromEmail: string;
  private readonly logger = new Logger(EmailService.name);

  constructor(private readonly configService: ConfigService) {
    const host = this.configService.getOrThrow<string>('EMAIL_HOST');
    const port = Number(this.configService.getOrThrow('EMAIL_PORT')); // ✅ FIX
    const user = this.configService.getOrThrow<string>('EMAIL_USER');
    const pass = this.configService.getOrThrow<string>('EMAIL_PASSWORD');

    this.fromEmail = this.configService.getOrThrow<string>('EMAIL_FROM');

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
      authMethod: 'LOGIN', // ✅ CRITICAL for Gmail
    });

    this.transporter.verify((error) => {
      if (error) {
        console.error('❌ Email transporter verification failed', error);
      } else {
        console.log('✅ Email transporter is ready');
      }
    });
  }

  // ---------------------------
  // Resume score email to HR
  // ---------------------------
  async sendResumeScoreToHR(user: ResumeUser, score: number, skills: string[]) {
    const hrEmail = this.configService.get<string>('HR_EMAIL');

    const mailOptions = {
      from: this.fromEmail,
      to: hrEmail,
      subject: `New Resume Submission - ${user.fullName}`,
      html: `
        <h2>New Resume Submission</h2>
        <p><strong>Candidate Name:</strong> ${user.fullName}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        ${user.phone ? `<p><strong>Phone:</strong> ${user.phone}</p>` : ''}
        <p><strong>Resume Score:</strong> ${score}/100</p>
        <p><strong>Key Skills:</strong> ${skills.join(', ')}</p>
        ${user.referredBy ? `<p><strong>Referred By:</strong> ${user.referredBy}</p>` : ''}
        <p><strong>Education:</strong> ${user.education || 'N/A'}</p>
        <p><strong>Experience:</strong> ${user.experience || 'N/A'}</p>
        <br />
        <p>Please review the candidate's profile in the system.</p>
      `,
    };

    try {
      this.logger.log(`📧 Sending resume email to HR: ${hrEmail}`);
      const info = await this.transporter.sendMail(mailOptions);
      this.logger.log(`✅ Email sent successfully: ${info.messageId}`);
      return info;
    } catch (error) {
      this.logger.error('❌ Failed to send resume email', error);
      throw new InternalServerErrorException('Failed to send email to HR');
    }
  }

  // ---------------------------
  // Referral payment email
  // ---------------------------
  async sendReferralPaymentNotification(
    referrerName: string,
    candidateName: string,
    candidateEmail: string,
  ) {
    const payrollEmail = this.configService.get<string>('PAYROLL_EMAIL');

    const mailOptions = {
      from: this.fromEmail,
      to: payrollEmail,
      subject: `Referral Payment Due - ${referrerName}`,
      html: `
        <h2>Referral Payment Notification</h2>
        <p><strong>Referrer Name:</strong> ${referrerName}</p>
        <p><strong>Candidate Name:</strong> ${candidateName}</p>
        <p><strong>Candidate Email:</strong> ${candidateEmail}</p>
        <p>The candidate has successfully completed their probation period.</p>
        <p>Please process the referral payment.</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log(`✅ Referral payment email sent to ${payrollEmail}`);
    } catch (error) {
      this.logger.error('❌ Failed to send referral payment email', error);
      throw new InternalServerErrorException(
        'Failed to send referral payment email',
      );
    }
  }

  // ---------------------------
  // Welcome email
  // ---------------------------
  async sendWelcomeEmail(email: string, name: string) {
    const mailOptions = {
      from: this.fromEmail,
      to: email,
      subject: 'Welcome to Resume Evaluator',
      html: `
        <h2>Welcome ${name}!</h2>
        <p>Thank you for registering with Resume Evaluator.</p>
        <p>Please upload your resume to get started with the evaluation process.</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log(`✅ Welcome email sent to ${email}`);
    } catch (error) {
      this.logger.error('❌ Failed to send welcome email', error);
      throw new InternalServerErrorException('Failed to send welcome email');
    }
  }
}
