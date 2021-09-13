import { IRouter } from "../../types";
import { notFoundControllers } from "../controllers";

const notFoundRoutes = (notFoundRouter: IRouter) => {
  const router = notFoundRouter;

  router.all("(.*)", notFoundControllers.notFound);
};

export default notFoundRoutes;
