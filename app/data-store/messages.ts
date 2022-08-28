import { Collection, MongoClient } from 'mongodb';
import { Config } from '../config';

export type Message = NewMessage & {
  userId: string;
};

export type NewMessage = {
  username: string;
  subject: string;
  message: string;
};

export class Messages {
  private messageStoreClient: MongoClient;
  private messageStore: Collection;

  constructor() {
    this.messageStoreClient = new MongoClient(Config.db.url);
    this.connect();
    this.messageStore = this.messageStoreClient
      .db(Config.db.name)
      .collection(Config.db.collections.messages);
  }

  async add(message: any) {
    await this.messageStore.insertOne(message);
  }

  private async connect() {
    await this.messageStoreClient.connect();
  }

  async closeConnection() {
    await this.messageStoreClient.close();
  }
}
