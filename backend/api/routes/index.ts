import { IRouter } from "../../types";
import buildLogger from "../../utils/logger";
import { Router } from "../../utils/requiredExports";
import nameRoutes from "./name.routes";
const logger = buildLogger("mainRoutes");

const mainRoutes = (router: IRouter) => {
  logger.info("inside main_routes");
  // Name routes
  const nameRouter = new Router({ prefix: "" });
  nameRoutes(nameRouter);
  // router.use("",nameRouter.routes()); //=> It can be use.
  router.use(nameRouter.routes());
};

export default mainRoutes;
