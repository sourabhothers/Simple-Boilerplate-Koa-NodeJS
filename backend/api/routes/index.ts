import { IRouter } from "../../types";
import buildLogger from "../../utils/logger";
import { Router } from "../../utils/requiredExports";
import nameRoutes from "./test.routes";
import notFoundRoutes from "./notFound.routes";
const logger = buildLogger("mainRoutes");

const mainRoutes = (mainRouter: IRouter) => {
  logger.info("inside main_routes");
  // Name routes
  const testRouter = new Router({});
  nameRoutes(testRouter);
  mainRouter.use("/test", testRouter.routes()); // It alternative method for above line.. But be careful with prefix. It'll prepend to existing routes.
  // mainRouter.use(testRouter.routes());

  // 404 Route Handler
  const notFoundRouter = new Router({ prefix: "" });
  notFoundRoutes(notFoundRouter);
  mainRouter.use(notFoundRouter.routes());
};

export default mainRoutes;
