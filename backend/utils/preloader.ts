import mainRoutes from "../api/routes";
import { Router } from "./requiredExports";
import buildLogger from "./logger";
import { IApplication } from "../types";

import cors from "@koa/cors";
import json from "koa-json";
import path from "path";
import config from "../config";
import koaEJS from "koa-ejs";

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
  // use cors if true
  if (config.CORS === "true") {
    app.use(cors({}));
  }

  // Using jSON
  app.use(json());

  //TODO: Enable bodyParser


  // Setting up views. EJS Templating engine.
  const viewsPath = path.resolve(__dirname, "../views");

  koaEJS(app, {
    root: viewsPath,
    layout: false, // Must provide layout.ejs in viewRoot. if enabled.
    viewExt: "ejs",
    cache: config.CACHE_VIEWS === "true",
    debug: true,
  });

  // Main Router
  const mainRouter = new Router();
  mainRoutes(mainRouter);

  // Using mainRouter
  app.use(mainRouter.routes());

  // 404 Not Found Route
  app.use(async function (ctx, next) {
    ctx.status = 404;
    await ctx.render("not_found", { title: "404 Not Found" });
    next();
  });

  // Error handling.
  app.on("error", (error) => {
    logger.error(`${error.name}\n${error.message}\n${error.stack}`);
  });

  // Setting preloader used or not to True
  isPreloaderUsed = true;
};

export default preloader;
