/**
 * Sync function by "async", "await".
 * 
 */

class TestApi {
  constructor() {
    this.user = {
      id: 1,
      name: 'test1'
    };
    this.friends = [this.user, this.user, this.user];
    this.photo = 'not a real photo';
  }

  getUser() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(this.user), 300);
    });
  }

  getFriends(userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(this.friends.slice()), 300);
    });
  }

  getPhoto(userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(this.photo), 300);
    });
  }

  throwError() {
    return new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('intentional error')), 300);
    });
  }
}

// EXAMPLE 01
function callbackHell() {
  const api = new TestApi();
  let user, friends;

  api.getUser().then(function (retUser) {
    user = retUser;
    api.getFriends(user.id).then(function (retFriends) {
      friends = retFriends;
      api.getPhoto(user.id).then(function (photo) {
        console.log('callbackHell', {
          user,
          friends,
          photo
        });
      });
    });
  });
}

function promiseChain() {
  const api = new TestApi();
  let user, friends;

  api.getUser()
    .then((retUser) => {
      user = retUser;
      return api.getFriends(user.id);
    })
    .then((retFriends) => {
      friends = retFriends;
      return api.getPhoto(user.id);
    })
    .then((photo) => {
      console.log('promiseChain', {
        user,
        friends,
        photo
      });
    })
    .catch((err) => console.error(err));
}

async function asyncAwait() {
  try {
    const api = new TestApi();
    const user = await api.getUser;
    const friends = await api.getFriends(user.id);
    const photo = await api.getPhoto(user.id);
    console.log('asyncAwait', {
      user,
      friends,
      photo
    });
    await api.throwError();
  } catch (err) {
    console.error(err);
  }
}

// EXAMPLE 02
function promiseLoop() {
  const api = new TestApi();

  api.getUser()
    .then((user) => {
      return api.getFriends(user.id)
    })
    .then((retFriends) => {
      const getAllFriends = (friends) => {
        if (friends.length > 0) {
          let friend = friends.pop();
          return api.getFriends(friend.id)
            .then((moreFriends) => {
              console.log('promiseLoop', moreFriends);
              return getAllFriends(friends);
            })
        }
      };
      return getAllFriends(retFriends);
    });
}

async function asyncAwaitLoop() {
  const api = new TestApi();
  const user = await api.getUser();
  const friends = await api.getFriends(user.id);
  for (let friend of friends) {
    let moreFriends = await api.getFriends(friend.id);
    console.log('asyncAwaitLoop', moreFriends);
  }
}

async function asyncAwaitLoopParallel() {
  const api = new TestApi();
  const user = await api.getUser();
  const friends = await api.getFriends(user.id);
  const friendPromises = friends.map(friend => api.getFriends(friend.id));
  const moreFriends = await Promise.all(friendPromises);
  console.log('asyncAwaitLoopParallel', moreFriends);
}

// EXAMPLE 03
async function getUserInfo() {
  try {
    const api = new TestApi();
    const user = await api.getUser;
    const friends = await api.getFriends(user.id);
    const photo = await api.getPhoto(user.id);
    return {
      user,
      friends,
      photo
    };
  } catch (err) {
    console.error(err);
  }
}

function promiseUserInfo() {
  getUserInfo()
    .then((userInfo) => console.log('promiseUserInfo', userInfo));
}

async function awaitUserInfo() {
  const {
    user,
    friends,
    photo
  } = await getUserInfo();
  console.log('awaitUserInfo', {
    user,
    photo
  });
}

if (require.main === module) {
  // callbackHell();
  // promiseChain();
  // asyncAwait();

  // promiseLoop();
  // asyncAwaitLoop();
  // asyncAwaitLoopParallel();

  // promiseUserInfo();
  awaitUserInfo();

  console.log('sync test done.');
}