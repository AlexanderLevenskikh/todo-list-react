import { IStoreDependencies } from 'root/stores/dependencies/index';
import { FakeApi } from 'root/api/fake';
import { FakeLogger } from 'root/shared/services/logger/fake';

export class FakeStoreDependencies implements IStoreDependencies {
    api = new FakeApi();
    logger = new FakeLogger();
}
