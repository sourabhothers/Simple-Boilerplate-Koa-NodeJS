import mainRoutes from "../api/routes";
import { Router } from "./requiredExports";
import buildLogger from "./logger";
import { IApplication } from "../types";

// Logger
const logger = buildLogger(__filename);

// Setting preloader used or not to False. Make sure to assign True if used.
export let isPreloaderUsed: boolean = false;

// Preloading configuration
logger.info("Preloader Configuring ...");

/**
 * Main Content
 *
 */
const preloader = (app: IApplication) => {
  // Main Router
  const mainRouter = new Router();
  mainRoutes(mainRouter);

  // Using mainRouter
  app.use(mainRouter.routes());

  // Setting preloader used or not to True
  isPreloaderUsed = true;
};



export default preloader;
