import { Collection, MongoClient } from 'mongodb';
import { Config } from '../config';

export enum SubsriptionType {
  Standard = 'standard',
  Premium = 'premium',
}

export type User = {
  name: string;
  subscription: SubsriptionType;
};

export class Users {
  private userStoreClient: MongoClient;
  private userStore: Collection;

  constructor() {
    this.userStoreClient = new MongoClient(Config.db.url);
    this.connect();
    this.userStore = this.userStoreClient
      .db(Config.db.name)
      .collection(Config.db.collections.users);
  }

  async add(user: User) {
    if (!Object.values(SubsriptionType).includes(user.subscription)) {
      throw new Error(`Subscription type ${user.subscription} is not available`);
    }
    return await this.userStore.insertOne(user);
  }

  async removeByName(name: string) {
    return await this.userStore.findOneAndDelete({ name });
  }

  async findByName(name: string) {
    return await this.userStore.findOne({ name });
  }

  async updateSubscription(options: { name:string, newSubscription: SubsriptionType }) {
    return await this.userStore.updateOne(
      { name: options.name },
      { $set: { subscription: options.newSubscription } }
    );
  }

  private async connect() {
    await this.userStoreClient.connect();
  }

  async closeConnection() {
    await this.userStoreClient.close();
  }
}
