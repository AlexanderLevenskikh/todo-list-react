import { NotImplementedError } from 'root/shared/errors/notImplementedError';
import { toaster } from 'evergreen-ui';

export interface INotifier {
    notifySuccess(message: string): void;
    notifyError(message: string): void;
    notifyInfo(message: string): void;
}

export class Notifier implements INotifier {
    notifySuccess(message: string) {
        toaster.success(message);
    }

    notifyError(message: string) {
        toaster.danger(message);
    }

    notifyInfo(message: string) {
        toaster.notify(message);
    }
}
