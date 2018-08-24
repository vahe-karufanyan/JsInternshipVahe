


import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/items';


class App {
    constructor() {
      this.app = express();
      this.app.use(bodyParser.json());
      this.initRoutes();
    }
  
    initRoutes() {
      routes(this.app);
    }
  
    start() {
      app.listen(3000, () => {
        console.log("Server is up!");
      });
    }
  }

  let app = new App();
  app.start();
  