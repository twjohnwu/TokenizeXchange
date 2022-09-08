// @ts-check
const moment = require('moment');
const { zadd } = require('./redis');
const { createUser, createPrivateRoom, getPrivateRoomId } = require('./utils');
/** Creating demo data */

const demoUsers = ["user001", "user002", "user003", 'user004'];

const addMessage = async (roomId, fromId, content, timestamp = moment().unix()) => {
  const roomKey = `room:${roomId}`;

  const message = {
    from: fromId,
    date: timestamp,
    message: content,
    roomId,
  };
  /** Now the other user sends the greeting to the user */
  await zadd(roomKey, "" + message.date, JSON.stringify(message));
};

const createDemoData = async () => {
  /** For each name create a user. */
  const users = [];
  for (let x = 0; x < demoUsers.length; x++) {
    const user = await createUser(demoUsers[x]);
    /** This one should go to the session */
    users.push(user);
  }

  const rooms = {};
  /** Once the demo users were created, for each user send messages to other ones. */
  for (let userIndex = 0; userIndex < users.length; userIndex++) {
    const user = users[userIndex];
    const otherUsers = users.filter(x => x.id !== user.id);

    for (let otherUserIndex = 0; otherUserIndex < otherUsers.length; otherUserIndex++) {
      const otherUser = otherUsers[otherUserIndex];
      let privateRoomId = getPrivateRoomId(user.id, otherUser.id);
      let room = rooms[privateRoomId];
      if (room === undefined) {
        const res = await createPrivateRoom(user.id, otherUser.id);
        room = res[0];
        rooms[privateRoomId] = room;
      }

      await addMessage(privateRoomId, otherUser.id, 'Hi~', moment().unix() - Math.random() * 222);
    }
  }
};

module.exports = {
  createDemoData
};
