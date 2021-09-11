import config from "./config";
import buildLogger from "./utils/logger";
import preloader, { isPreloaderUsed } from "./utils/preloader";
import { MainApplication } from "./utils/requiredExports";

// Initializing config before starting app
config;

const logger = buildLogger(__filename);

// App
const app = new MainApplication();
preloader(app);

// Checking if preloader is called or Just imported
if (!isPreloaderUsed) {
  logger.error("Please pass arguments to preloader. It's just imported there.");
  process.exit(0);
}

export default app;
