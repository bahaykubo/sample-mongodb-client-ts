import { expect } from 'chai';
import { SubsriptionType, Users } from '../app/data-store';

describe('Messenger Users', function () {
  const newUser = 'testUser01';
  let users: Users;

  before(function () {
    users = new Users();
  });

  after(async function () {
    await users.removeByName(newUser);
    await users.closeConnection();
  });

  it('should create a new user with a subscription successfully', async function () {
    await users.add({ name: newUser, subscription: SubsriptionType.Premium })
      .then((result) => {
        expect(result.insertedId).to.not.be.null;
      });
  });

  it('should not be able to create a new user with an invalid subscription', async function () {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    await users.add({ name: 'bingo', subscription: 'invalid' })
      .catch((error) => {
        expect(error.message).to.equal('Subscription type invalid is not available');
      });
  });

  it('should not be able to create users with the same name', async function () {
    await users.add({ name: newUser, subscription: SubsriptionType.Standard })
      .catch((error) => {
        expect(error.message).to.contain('duplicate key error collection');
      });
  });
});
