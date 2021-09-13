import mainRoutes from "../api/routes";
import { Router } from "./requiredExports";
import buildLogger from "./logger";
import { IApplication, ICustomError, IRouterContext } from "../types";

import cors from "@koa/cors";
import path from "path";
import config from "../config";
import koaEJS from "koa-ejs";
import bodyParser from "koa-bodyparser";
import { buildApiError, errorAsText } from "./utils";

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
  // Internal Error handling - START
  app.use(async (ctx, next) => {
    try {
      // Try block : Level 1
      // It'll execute on each request. And will watch if is everything going fine.

      await next();

      // Log Incoming Request.
      logger.info(`${ctx.method} ${ctx.path} - ${ctx.status}`);
      //
    } catch (error: any) {
      // Catch Error : Level 1

      try {
        // Try block : Level 2
        const defaultError: ICustomError = {
          name: "Internal Error",
          message: "Something went wrong",
          statusCode: 500,
          description: "",
          code: "000",
          isCustom: false
        };

        // If error is know/ thrown willingly then return same error. With isCustom prop.
        if (error.isCustom) {
          ctx.status = error.statusCode;
          ctx.body = { error };
          return;
        }

        // Conditional error
        switch (error.name) {
          case "SyntaxError":
            defaultError.statusCode = 400;
            defaultError.name = "SyntaxError";
            defaultError.message = error.message;
            defaultError.description =
              "Please ensure sending form / json data is correct.";
            break;

          case "PayloadTooLargeError":
            defaultError.statusCode = 400;
            defaultError.name = "PayloadTooLargeError";
            defaultError.message = error.message;
            break;

          case "TypeError":
            defaultError.statusCode = 500;
            defaultError.name = "TypeError";
            defaultError.message = "Error! Internal Type Error.";
            break;

          case "ReferenceError":
            defaultError.statusCode = 500;
            defaultError.name = "ReferenceError";
            defaultError.message = error.message;
            break;

          default:
            defaultError.message = "";
            // defaultError.message = error.message;

            // Log Error only if unlisted
            logger.error(errorAsText(error));
            break;
        }

        ctx.status = defaultError.statusCode;
        ctx.body = { error: defaultError };
      } catch (catchError) {
        // Nested catch block of catch : Level 2
        app.emit("error", catchError, ctx);
      }
    }
  });
  // Internal Error handling - END

  // use CORS if true
  if (config.CORS === true) {
    app.use(cors({}));
  }

  //DONE: Enable bodyParser
  app.use(
    bodyParser({
      jsonLimit: "50kb",
      formLimit: "50kb",
      enableTypes: ["json", "form"],
      onerror: (err, ctx) => {
        throw buildApiError({
          message: err.message,
          description:
            "Fixes : 1) Max accepted data is 50kb. 2) Should be JSON / FORM data. 3) User TypeError.",
          statusCode: 400
        });
      }
    })
  );

  // Setting up views. EJS Templating engine.
  const viewsPath = path.resolve(__dirname, "../views");

  koaEJS(app, {
    root: viewsPath,
    layout: false, // Must provide layout.ejs in viewRoot. if enabled.
    viewExt: "ejs",
    cache: config.CACHE_VIEWS === true,
    debug: config.DEBUG === true
  });

  // Main Router
  const mainRouter = new Router();
  mainRoutes(mainRouter);

  // Using mainRouter
  app.use(mainRouter.routes());

  // 404 Not Found Route => Moved to api/routes/index file

  // Centralized App Error handling. - START
  app.on("error", (error, ctx: IRouterContext) => {
    const defaultError: ICustomError = {
      name: "CentralizedError",
      message: "Something went wrong",
      statusCode: 500,
      description: "Please retry later.",
      code: "000",
      isCustom: false
    };

    const errText = errorAsText(error);
    logger.error("Centralized Error : \n" + errText);

    ctx.status = defaultError.statusCode;
    ctx.body = { error: defaultError };
  });
  // Centralized App Error handling. - END

  // Setting preloader used or not to True
  isPreloaderUsed = true;
};

export default preloader;
