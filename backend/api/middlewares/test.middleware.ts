import { Next } from 'koa';
import { IRouterContext } from '../../types';
// import { testService } from '../services';

export const testMiddlewareTwo = '';

export const testMiddleware = async (ctx: IRouterContext, next: Next) => {
  ctx.isMiddleware = 'true';
  await next();

  ctx.body = "I'm middleware";
};
