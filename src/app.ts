import express from "express";
import config from "config";
import log from "./utils/logger";
import connect from "./utils/connect";
import routes from "./routes";
import { deserializeUser } from "./middleware/deserializeUser";

const app = express();
const port: Number = config.get("port");
const host: String = config.get("host");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(deserializeUser);

app.listen(port, () => {
  log.info(`Server listening on port ${host}:${port}`);

  connect();
  routes(app);
});
