import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('EMAIL_HOST'),
      port: this.configService.get<number>('EMAIL_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASSWORD'),
      },
    });
  }

  async sendResumeScoreToHR(user: any, score: number, skills: string[]) {
    const hrEmail = this.configService.get<string>('HR_EMAIL');

    const mailOptions = {
      from: this.configService.get<string>('EMAIL_FROM'),
      to: hrEmail,
      subject: `New Resume Submission - ${user.fullName}`,
      html: `
        <h2>New Resume Submission</h2>
        <p><strong>Candidate Name:</strong> ${user.fullName}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Phone:</strong> ${user.phone}</p>
        <p><strong>Resume Score:</strong> ${score}/100</p>
        <p><strong>Key Skills:</strong> ${skills.join(', ')}</p>
        ${user.referredBy ? `<p><strong>Referred By:</strong> ${user.referredBy}</p>` : ''}
        <p><strong>Education:</strong> ${user.education || 'N/A'}</p>
        <p><strong>Experience:</strong> ${user.experience || 'N/A'}</p>
        <br>
        <p>Please review the candidate's profile in the system.</p>
      `,
    };

    try {
      console.log('📧 Attempting to send email to HR:', hrEmail);
      console.log('Email config:', {
        host: this.configService.get<string>('EMAIL_HOST'),
        port: this.configService.get<number>('EMAIL_PORT'),
        user: this.configService.get<string>('EMAIL_USER'),
      });
      
      const info = await this.transporter.sendMail(mailOptions);
      console.log('✅ Email sent successfully:', info.messageId);
      return info;
    } catch (error) {
      console.error('❌ Email sending failed:', error);
      throw error;
    }
  }

  async sendReferralPaymentNotification(referrerName: string, candidateName: string, candidateEmail: string) {
    const payrollEmail = this.configService.get<string>('PAYROLL_EMAIL');

    const mailOptions = {
      from: this.configService.get<string>('EMAIL_FROM'),
      to: payrollEmail,
      subject: `Referral Payment Due - ${referrerName}`,
      html: `
        <h2>Referral Payment Notification</h2>
        <p><strong>Referrer Name:</strong> ${referrerName}</p>
        <p><strong>Candidate Name:</strong> ${candidateName}</p>
        <p><strong>Candidate Email:</strong> ${candidateEmail}</p>
        <p>The candidate has successfully completed their probation period.</p>
        <p>Please process the referral payment for ${referrerName}.</p>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendWelcomeEmail(email: string, name: string) {
    const mailOptions = {
      from: this.configService.get<string>('EMAIL_FROM'),
      to: email,
      subject: 'Welcome to Resume Evaluator',
      html: `
        <h2>Welcome ${name}!</h2>
        <p>Thank you for registering with Resume Evaluator.</p>
        <p>Please upload your resume to get started with the evaluation process.</p>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
