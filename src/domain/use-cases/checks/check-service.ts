import { LogEntity, LogSeverityLevel } from "@/domain/entities/log.entity";
import { LogRepository } from "@/domain/repository/log.repository";

interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (err: string) => void;

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback?: SuccessCallback,
        private readonly errorCallback?: ErrorCallback
    ) {
    }

    async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url)

            if (!req.ok) {
                throw new Error(`Service not available ${url}`)
            }

            const log = new LogEntity({
                message: `Service ${url} working`,
                level: LogSeverityLevel.LOW,
                origin: 'check-service.ts'
            })
            this.logRepository.saveLog(log)

            this.successCallback && this.successCallback();
            return true;
        } catch (error) {
            const errorMessage = `${url} is DOWN. ${error}`;

            const log = new LogEntity({
                message: errorMessage,
                level: LogSeverityLevel.HIGH,
                origin: 'check-service.ts'
            })
            this.logRepository.saveLog(log);

            this.errorCallback && this.errorCallback(errorMessage);
            return false
        }
    }
}