const Redis = require("ioredis");

const redisClient = new Redis();

redisClient.on("connection", () => {
    console.log("Connected to Redis Server");
});

module.exports = redisClient;