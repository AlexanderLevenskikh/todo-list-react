import { IStoreDependencies } from 'root/stores/dependencies/index';
import { FakeApi } from 'root/api/fake';
import { FakeLogger } from 'root/shared/services/logger/fake';
import { Notifier } from 'root/shared/services/notifier';

export class FakeStoreDependencies implements IStoreDependencies {
    api = new FakeApi();
    logger = new FakeLogger();
    notifier = new Notifier();
}
