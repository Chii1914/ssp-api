import { Controller, Post, Body } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { EmailDto } from './dto/mail.dto';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post()
  async sendMail(@Body () emailDto: EmailDto) {
    await this.mailerService.sendMail(emailDto.to, emailDto.subject, emailDto.text, emailDto.html, emailDto.cc, emailDto.name_file, emailDto.path_file);
    return {message: 'Email enviado'};
  }

}
