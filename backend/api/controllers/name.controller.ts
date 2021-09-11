import { IRouterContext } from "../../types";
import { nameService } from "../services";

export const hello = async (ctx: IRouterContext) => {
  const sData = await nameService.firstService();
  ctx.status = 200;
  ctx.body = sData;
};

export const hello_engine = async (ctx: IRouterContext) => {
  const sData = await nameService.firstService();
  ctx.status = 200;
  ctx.state = { name: "EJS" };
  await ctx.render("hello_engine", { names: "EJS", title:"EJS Title" });
};
