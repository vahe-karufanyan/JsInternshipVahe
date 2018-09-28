import itemsRouter from './items/items';
import usersRouter from './users/users';
import signUpRouter from './authentication/signUp';
import logInRouter from './authentication/logIn';
import search from './search/search'

var v1 = function(app) {
    app.use("/api/v1/item", itemsRouter);
    app.use("/api/v1/user", usersRouter);
    app.use("api/v1/authorisation", logInRouter);
    app.use("api/v1/signup", signUpRouter);
    app.use("api/v1/search", search)
};

export default v1;