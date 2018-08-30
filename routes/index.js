import itemsRouter from './items/items'



var v1 = function(app) {
    app.use("/api/v1/items", itemsRouter);
};

export default v1;