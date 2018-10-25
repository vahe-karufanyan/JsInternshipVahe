import itemsRouter from './items/items';
import authentication from './authentication/authentication';
import search from './search/search';

const v1 = (app) => {
  app.use('/api/v1/item', itemsRouter);
  app.use('/api/v1/authorisation', authentication);
  app.use('/api/v1/search', search);
};

export default v1;