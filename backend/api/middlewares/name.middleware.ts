import { IRouterContext } from "../../types";
import { nameService } from "../services";

export const hello = async (ctx: IRouterContext) => {
  const sData = await nameService.firstService();
  ctx.body = sData;
};
