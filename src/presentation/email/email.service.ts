import { MAILER_EMAIL, MAILER_SECRET_KEY, MAILER_SERVICE } from '@/config/plugins/envs.plugin';
import nodemailer from 'nodemailer';

interface SendMailOptions {
    to: string | string[];
    subject: string;
    body: string;
    attachments?: Attachment[]
}

interface Attachment {
    filename: string;
    path: string;
}

export class EmailService {
    private transporter = nodemailer.createTransport({
        service: MAILER_SERVICE,
        auth: {
            user: MAILER_EMAIL,
            pass: MAILER_SECRET_KEY,
        }
    })

    constructor() { }

    async sendEmail({ to, subject, body, attachments }: SendMailOptions): Promise<boolean> {
        try {
            await this.transporter.sendMail({
                to,
                subject,
                text: body,
                attachments
            });

            return true
        } catch (error) {
            return false
        }
    }

    async sendEmailWithLogFiles(to: string | string[]) {
        const subject = 'Log Files';
        const text = 'Log Files Text';

        const attachments: Attachment[] = [
            {
                filename: 'logs-low.log',
                path: './logs/logs-low.log'
            },
            {
                filename: 'logs-medium.log',
                path: './logs/logs-medium.log'
            },
            {
                filename: 'logs-high.log',
                path: './logs/logs-high.log'
            },
        ]

        return this.sendEmail({ to, subject, body: text, attachments })
    }
}