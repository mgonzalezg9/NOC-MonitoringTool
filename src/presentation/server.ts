import { FileSystemDataSource } from "@/infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "@/infrastructure/repositories/log.repository.impl";

const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDataSource())

export class Server {
    public static start() {
        console.log('Server started...');

        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository,
        // ).execute(MAILER_EMAIL);

        // CronService.createJob('*/5 * * * * *',
        //     () => {
        //         const url = 'https://google.com';

        //         new CheckService(
        //             fileSystemLogRepository,
        //         ).execute(url)
        //     }
        // );
    }
}