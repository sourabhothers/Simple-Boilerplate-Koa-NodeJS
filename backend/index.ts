// Import Config in beginning
import config from "./config";
config;

import app from "./app";
import buildLogger from "./utils/logger";

// Build logger
const logger = buildLogger("main_index");

// Listen / Start app
app.listen(config.PORT, () => {
  logger.info(`App is running : http://${config.HOSTNAME}:${config.PORT}`);
});
