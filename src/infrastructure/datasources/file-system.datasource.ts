import { LogDataSource } from "@/domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "@/domain/entities/log.entity";
import fs from "fs";


export class FileSystemDataSource implements LogDataSource {
    private readonly logPath = 'logs';

    private readonly priorityLogMap = {
        [LogSeverityLevel.LOW]: `${this.logPath}/logs-low.log`,
        [LogSeverityLevel.MEDIUM]: `${this.logPath}/logs-medium.log`,
        [LogSeverityLevel.HIGH]: `${this.logPath}/logs-high.log`,
    };

    constructor() {
        this.createLogFiles();
    }

    private createLogFiles = () => {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath)
        }

        Object.values(this.priorityLogMap).forEach(path => {
            if (!fs.existsSync(path)) {
                fs.writeFileSync(path, '')
            }
        })
    }

    private getLogsFromFile = (path: string): LogEntity[] => {
        const content = fs.readFileSync(path, 'utf8');
        return content.split('\n').map(LogEntity.fromJson);
    }

    saveLog(newLog: LogEntity): Promise<void> {
        const logAsJSON = `${JSON.stringify(newLog)}\n`

        fs.appendFileSync(this.priorityLogMap[newLog.level], logAsJSON)

        // All logs are written into low log
        if (newLog.level !== LogSeverityLevel.LOW) {
            fs.appendFileSync(this.priorityLogMap[LogSeverityLevel.LOW], logAsJSON)
        }

        return Promise.resolve();
    }

    getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logEntities = this.getLogsFromFile(this.priorityLogMap[severityLevel]);
        return Promise.resolve(logEntities);
    }

}