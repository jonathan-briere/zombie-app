import fs from "fs";

export default {
  port: 1337,
  host: "localhost",
  dbUri: "mongodb://localhost:27017/rest-pai",
  saltWorkFactor: 10,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
  publicKey: fs.readFileSync('jwtRS256.key.pub'),
  privateKey: fs.readFileSync('jwtRS256.key'),
};
