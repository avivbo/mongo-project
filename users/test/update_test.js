const assert = require('assert');
const User = require('../src/user');

describe('Updadting records', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe', likes: 0 });
    joe.save().then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Aviv');
        done();
      });
  }

  it('instance type using set n save', (done) => {
    joe.set('name', 'Aviv');
    assertName(joe.save(), done);
  });

  it('A model instance can update', (done) => {
    assertName(joe.update({ name: 'Aviv' }), done);
  });

  it('A model class can update', (done) => {
    assertName(User.updateMany({ name: 'Joe' }, { name: 'Aviv' }), done);
  });

  it('A model class can update one record', (done) => {
    assertName(User.findOneAndUpdate({ name: 'Joe' }, { name: 'Aviv' }), done);
  });

  it('A model class can find a record with an ID and update', (done) => {
    assertName(User.findByIdAndUpdate(joe._id, { name: 'Aviv' }), done);
  });

  it('A user can have their postcount inremented by 1', (done) => {
    User.updateMany({ name: 'Joe' }, { $inc: { likes: 10 } })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.likes === 10);
        done();
      });
  });
});
