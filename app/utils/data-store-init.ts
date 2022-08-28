import { MongoClient } from 'mongodb';
import { Config } from '../config';

const storeClient = new MongoClient(Config.db.url);

const setupUserStore = async () => {
  await storeClient.connect();
  const userStore = storeClient
    .db(Config.db.name)
    .collection(Config.db.collections.users);
  await userStore.createIndex({ name: 1 }, { unique: true });
  await storeClient.close();
};

setupUserStore();
