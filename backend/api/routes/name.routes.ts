import { IRouter } from "../../types";
import { nameController } from "../controllers";

const nameRoutes = (router: IRouter) => {
  router.get("/hello", nameController.hello);
};

export default nameRoutes;
