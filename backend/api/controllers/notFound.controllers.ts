import { IRouterContext } from "../../types";

// Its directly used with router inside routes/index file.
export const notFound = async (ctx: IRouterContext) => {
  ctx.status = 404;
  await ctx.render("not_found", { title: "404 Not Found" });
};
