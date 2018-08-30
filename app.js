


import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';


class App {
    constructor() {
      this.app = express();
      this.app.use(bodyParser.json());
      routes(this.app);
    }
  
    start() {
      this.app.listen(3000, () => {
        console.log("Server is up!");
      });
    }
  }

  let app = new App();
  app.start();

  export default app;
  