import itemsRouter from './items/items'
import usersRouter from './users/users'

var v1 = function(app) {
    app.use("/api/v1/item", itemsRouter);
    app.use("/api/v1/user", usersRouter);
};

export default v1;