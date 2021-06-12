import { ILogger } from 'root/shared/services/logger/index';

export class FakeLogger implements ILogger {
    logDebug(message: string) {
        console.log(message);
    }

    logError(message: string) {
        console.error(message);
    }

    logWarn(message: string) {
        console.warn(message);
    }
}
