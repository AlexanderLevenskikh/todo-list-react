export interface ILogger {
    logDebug(message: string): void;
    logWarn(message: string): void;
    logError(message: string): void;
}
