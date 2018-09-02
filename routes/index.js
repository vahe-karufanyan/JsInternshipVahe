import itemsRouter from './items/items'
import usersRouter from './items/users'

var v1 = function(app) {
    app.use("/api/v1/items", itemsRouter);
    app.use("/api/v1/users", usersRouter);
};

export default v1;