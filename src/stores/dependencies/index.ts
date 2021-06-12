import { IApi } from 'root/api';
import { ILogger } from 'root/shared/services/logger';
import { INotifier } from 'root/shared/services/notifier';

export interface IStoreDependencies {
    api: IApi;
    logger: ILogger;
    notifier: INotifier;
}
