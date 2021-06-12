import { IApi } from 'root/api';
import { ILogger } from 'root/shared/services/logger';

export interface IStoreDependencies {
    api: IApi;
    logger: ILogger;
}
