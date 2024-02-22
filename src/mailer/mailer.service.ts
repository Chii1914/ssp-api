import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import path from 'path';

const correo_ssp = "maximiliano.aguirre@alumnos.uv.cl";

@Injectable()
export class MailerService {
    private transporter;
    constructor(private readonly configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            host: this.configService.get<string>('MAIL_HOST'),
            port: this.configService.get<number>('MAIL_PORT'),
            secure: true,
            auth: {
                user: this.configService.get<string>('MAIL_USER'),
                pass: this.configService.get<string>('MAIL_PASS'),
            },
        });
    }

    async sendMail(to: string, subject: string, text: string, html?: string, cc?: string, name_file?: string, path_file?: string) {
        const mailOptions = {
            from: `Sistema de prácticas profesionales <${correo_ssp}>`,
            to,
            subject,
            text,
            html,
            cc,
            attachments: [
                {
                    filename: name_file,
                    path: path_file,
                }
            ]
        };
        return this.transporter.sendMail(mailOptions);
    }
    
}
