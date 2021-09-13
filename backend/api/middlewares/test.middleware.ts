import { Next } from "koa";
import { IRouterContext } from "../../types";
import { testService } from "../services";

export const test = async (ctx: IRouterContext, next: Next) => {
  ctx.isMiddleware = "true";
  console.log("I'm middleware before");
  await next();
  console.log("I'm middleware after");

  ctx.body = "I'm middleware";
};
