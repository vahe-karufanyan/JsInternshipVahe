import itemsRouter from './items/items';
import authentication from './authentication/authentication';
import search from './search/search';
import buy from './buy/buy';
import users from './users/users';

const v1 = (app) => {
  app.use('/api/v1/item', itemsRouter);
  app.use('/api/v1/authorisation', authentication);
  app.use('/api/v1/search', search);
  app.use('/api/v1/buy', buy);
  app.use('/api/v1/users', users);
};

export default v1;