// @ts-check
require("dotenv").config();
const redis = require("redis");

const endpoint = process.env.REDIS_ENDPOINT_URL || "127.0.0.1:6379";
const password = process.env.REDIS_PASSWORD || null;

const [host, port] = endpoint.split(":");

const resolvePromise = (resolve, reject) => {
  return (err, data) => {
    if (err) {
      reject(err);
    }
    resolve(data);
  };
};

const auth = (client) => new Promise((a, b) => {
  if (password === null) {
    a(true);
  } else {
    client.auth(password, resolvePromise(a, b));
  }
});

/** @type {import('redis').RedisClient} */
const client = redis.createClient(+port, host);

/** @type {import('redis').RedisClient} */
const sub = redis.createClient(+port, host, password === null ? undefined : {
  password
});

module.exports = {
  client,
  sub,
  auth: async () => {
    await auth(client);
    await auth(sub);
  },
  // Increment the integer value of a key by one.
  incr: (key = "key") =>
    new Promise((a, b) => client.incr(key, resolvePromise(a, b))),
  // Decrement the integer value of a key by the given number.
  decr: (key = "key") =>
    new Promise((a, b) => client.decr(key, resolvePromise(a, b))),
  // Set multiple hash fields to multiple values.
  hmset: (key = "key", values = []) =>
    new Promise((a, b) => client.hmset(key, values, resolvePromise(a, b))),
  // Determine if a key exists.
  exists: (key = "key") =>
    new Promise((a, b) => client.exists(key, resolvePromise(a, b))),
  // Determine if a hash field exists.
  hexists: (key = "key", key2 = "") =>
    new Promise((a, b) => client.hexists(key, key2, resolvePromise(a, b))),
  // Set the string value of a key.
  set: (key = "key", value) =>
    new Promise((a, b) => client.set(key, value, resolvePromise(a, b))),
  // Get the value of a key.
  get: (key = "key") =>
    new Promise((a, b) => client.get(key, resolvePromise(a, b))),
  // Get all fields and values in a hash.
  hgetall: (key = "key") =>
    new Promise((a, b) => client.hgetall(key, resolvePromise(a, b))),
  // Return a range of members in a sorted set, by score.
  zrangebyscore: (key = "key", min = 0, max = 1) =>
    new Promise((a, b) =>
      client.zrangebyscore(key, min, max, resolvePromise(a, b))
    ),
  // Add one or more members to a sorted set, or update its score if it already exists.
  zadd: (key = "key", key2 = "", value) =>
    new Promise((a, b) => client.zadd(key, key2, value, resolvePromise(a, b))),
  // Append one or multiple members to a set.
  sadd: (key = "key", value) =>
    new Promise((a, b) => client.sadd(key, value, resolvePromise(a, b))),
  // Get the values of all the given hash fields.
  hmget: (key = "key", key2 = "") =>
    new Promise((a, b) => client.hmget(key, key2, resolvePromise(a, b))),
  // Determine if a given value is a member of a set.
  sismember: (key = "key", key2 = "") =>
    new Promise((a, b) => client.sismember(key, key2, resolvePromise(a, b))),
  // Get all the members in a set.
  smembers: (key = "key") =>
    new Promise((a, b) => client.smembers(key, resolvePromise(a, b))),
  // Remove one or more members from a set.
  srem: (key = "key", key2 = "") =>
    new Promise((a, b) => client.srem(key, key2, resolvePromise(a, b))),
};
