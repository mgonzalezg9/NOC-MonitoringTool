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

            const log = new LogEntity(`Service ${url} working`, LogSeverityLevel.LOW)
            this.logRepository.saveLog(log)

            this.successCallback && this.successCallback();
            return true;
        } catch (error) {
            const errorMessage = `${url} is DOWN. ${error}`;

            const log = new LogEntity(errorMessage, LogSeverityLevel.HIGH)
            this.logRepository.saveLog(log);

            this.errorCallback && this.errorCallback(errorMessage);
            return false
        }
    }
}