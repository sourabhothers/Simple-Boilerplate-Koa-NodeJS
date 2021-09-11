import { IRouter } from "../../types";
import { nameController } from "../controllers";

const nameRoutes = (router: IRouter) => {
  router.get("/hello", nameController.hello);
  router.get("/hello_engine", nameController.hello_engine);
};

export default nameRoutes;
