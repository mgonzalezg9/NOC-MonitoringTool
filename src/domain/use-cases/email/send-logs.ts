import { LogEntity, LogSeverityLevel } from "@/domain/entities/log.entity";
import { LogRepository } from "@/domain/repository/log.repository";
import { EmailService } from "@/presentation/email/email.service";

interface SendLogEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailLogs implements SendLogEmailUseCase {
    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository
    ) {

    }

    async execute(to: string | string[]) {
        try {
            const sent = await this.emailService.sendEmailWithLogFiles(to)

            if (!sent) {
                throw new Error('Email log not sent')
            }

            const log = new LogEntity({
                message: `Email with logs sent to ${to}`,
                level: LogSeverityLevel.LOW,
                origin: 'send-email-logs.ts'
            })
            this.logRepository.saveLog(log);

            return true
        } catch (error) {
            const log = new LogEntity({
                message: `${error}`,
                level: LogSeverityLevel.HIGH,
                origin: 'send-email-logs.ts'
            })
            this.logRepository.saveLog(log);

            return false
        }
    }
}