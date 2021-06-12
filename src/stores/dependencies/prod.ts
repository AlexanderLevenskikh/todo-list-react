import { IStoreDependencies } from 'root/stores/dependencies/index';
import { Api } from 'root/api/prod';
import { Logger } from 'root/shared/services/logger/prod';

export class StoreDependencies implements IStoreDependencies {
    api = new Api();
    logger = new Logger();
}
