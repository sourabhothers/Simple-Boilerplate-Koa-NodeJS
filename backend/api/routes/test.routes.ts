import { IRouter } from "../../types";
import { nameControllers } from "../controllers";
import { testMiddleware } from "../middlewares";

const nameRoutes = (testRouter: IRouter) => {
  const router: IRouter = testRouter;

  router.get("/", nameControllers.test_);
  router.get("/engine", nameControllers.test_engine);
  router.get("/json", nameControllers.test_json);
  router.get("/form", nameControllers.test_form);
  router.get(
    "/middleware",
    testMiddleware.test,
    nameControllers.afterTestMiddleware
  );
  router.get("/params/:param_1", nameControllers.test_params);
};

export default nameRoutes;
