// eslint-disable-next-line @typescript-eslint/naming-convention
export const Config = {
  db: {
    url: 'mongodb://admin:admin@localhost:27017',
    name: 'messenger',
    collections: {
      messages: 'messages',
      users: 'users',
    },
  },
};
