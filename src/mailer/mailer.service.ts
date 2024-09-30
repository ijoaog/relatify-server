import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MailerService {
  private readonly mailerUrl = process.env.MAILER_URL;
  private readonly token = process.env.MAILER_TOKEN;

  async sendMail(to: string, subject: string, body: string): Promise<any> {
    const payload = {
      to,
      subject,
      body,
    };

    try {
      const response = await axios.post(this.mailerUrl, payload, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error sending mail:', error.response?.data || error.message);
      throw error;
    }
  }
}
