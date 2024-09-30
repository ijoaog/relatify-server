import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service'; // Importe o seu MailerService

@Module({
  providers: [MailerService],
  exports: [MailerService], // Exporte o MailerService para ser usado em outros módulos
})
export class MailerModule {}
