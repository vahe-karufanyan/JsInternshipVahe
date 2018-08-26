import router from './items/items'



var v1 = function(app) {
    app.use("/api/v1/public", router);
    return router;  
};

export default v1;