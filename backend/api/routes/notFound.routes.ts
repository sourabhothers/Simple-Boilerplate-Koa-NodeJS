import { IRouter } from '../../types';
import { notFoundControllers } from '../controllers';

const notFoundRoutes = (notFoundRouter: IRouter): void => {
  const router = notFoundRouter;

  router.all('(.*)', notFoundControllers.notFound);
};

export default notFoundRoutes;
