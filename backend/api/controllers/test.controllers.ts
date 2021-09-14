import { IRouterContext } from '../../types';
// import buildLogger from '../../utils/logger';
import { buildApiError } from '../../utils/utils';
import { testService } from '../services';

// const logger = buildLogger(__filename);

//
export const test = async (ctx: IRouterContext): Promise<void> => {
  const sData = await testService.firstService();
  ctx.status = 200;
  ctx.body = sData;
};

//
export const testEngine = async (ctx: IRouterContext): Promise<void> => {
  ctx.status = 200;
  await ctx.render('test_engine', { names: 'EJS', title: 'EJS Title' });
};

//
export const testJson = async (ctx: IRouterContext): Promise<void> => {
  const body = ctx.request.body as { name?: string; title?: string };
  if (!body) {
    throw buildApiError({
      message: 'Valid body is required !',
      statusCode: 400,
      description: 'Please give valid body',
    });
  }
  if (body) {
    if (!body.name && body.name !== '') {
      throw buildApiError({
        message: 'Valid body.name is required !',
        statusCode: 400,
        description: 'Please give name property in body',
      });
    } else if (!body.title && body.name !== '') {
      throw buildApiError({
        message: 'Valid body.title is required !',
        statusCode: 400,
        description: 'Please give title property in body',
      });
    }
  }
  ctx.status = 200;
  await ctx.render('test_engine', {
    name: body.name,
    title: body.title,
  });
};

//
export const testForm = async (ctx: IRouterContext): Promise<void> => {
  const body = ctx.request.body as { name?: string; title?: string };
  ctx.status = 200;
  await ctx.render('test_engine', {
    name: body.name,
    title: body?.title,
  });
};

// Dynamic parameter routing
export const testParams = async (ctx: IRouterContext): Promise<void> => {
  const { params } = ctx;
  ctx.body = `It's dynamic controller. Received param value is : ${params?.param_1}`;
};

export const testMiddleController = async (
  ctx: IRouterContext,
): Promise<void> => {
  if (ctx.isMiddleware === 'true') {
    ctx.body = 'Middleware is working';
    return;
  }
  ctx.body = 'Middleware NOT working.';
};
