export enum LogSeverityLevel {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
}

interface LogEntityOptions {
    level: LogSeverityLevel;
    message: string;
    createdAt?: Date;
    origin?: string;
}

export class LogEntity {
    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin?: string;

    constructor({ message, level, createdAt = new Date(), origin }: LogEntityOptions) {
        this.message = message;
        this.level = level;
        this.origin = origin;
        this.createdAt = createdAt;
    }

    static fromJson(json: string): LogEntity {
        const { message, level, origin, createdAt } = JSON.parse(json)
        const log = new LogEntity({
            message,
            level,
            origin,
            createdAt
        });

        return log;
    }

}