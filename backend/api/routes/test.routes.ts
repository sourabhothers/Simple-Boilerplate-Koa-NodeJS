import { IRouter } from '../../types';
import { testControllers } from '../controllers';
import { testMiddleware } from '../middlewares';

const nameRoutes = (testRouter: IRouter): void => {
  const router: IRouter = testRouter;

  router.get('/', testControllers.test);
  router.get('/engine', testControllers.testEngine);
  router.get('/json', testControllers.testJson);
  router.get('/form', testControllers.testForm);
  router.get(
    '/middleware',
    testMiddleware.testMiddleware,
    testControllers.testMiddleController,
  );
  router.get('/params/:param_1', testControllers.testParams);
};

export default nameRoutes;
