import { ILogger } from 'root/shared/services/logger/index';
import { NotImplementedError } from 'root/shared/errors/notImplementedError';

// Write logs to sentry or other frontend logging tool
export class Logger implements ILogger {
    logDebug(message: string) {
        throw new NotImplementedError();
    }

    logError(message: string) {
        throw new NotImplementedError();
    }

    logWarn(message: string) {
        throw new NotImplementedError();
    }
}
