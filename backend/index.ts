// Import Config in beginning
import config from "./config";
config;

import app from "./app";
import buildLogger from "./utils/logger";
import cluster from "cluster";
import { cpus } from "os";

// Build logger
const logger = buildLogger("main_index");

const startApplication = () => {
  // Listen / Start app
  app.listen(config.PORT, () => {
    logger.info(`App is running : http://${config.HOSTNAME}:${config.PORT}`);
  });
};

// Enable Multiple instances of app for performance.
if (config.CLUSTER === "true") {
  if (cluster.isMaster) {
    for (var i = 0; i < cpus().length; i++) {
      cluster.fork();
    }
  } else {
    startApplication();
  }
} else {
  // Just single instance
  startApplication();
}
