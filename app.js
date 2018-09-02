import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import mongoose from 'mongoose';

class App {
  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
    routes(this.app);
    mongoose.connect('mongodb://vahe_karufanyan:itemShop@node-rest-itemshop-shard-00-00-vp7bh.mongodb.net:27017,node-rest-itemshop-shard-00-01-vp7bh.mongodb.net:27017,node-rest-itemshop-shard-00-02-vp7bh.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-itemShop-shard-0&authSource=admin&retryWrites=true',
    { 
      useNewUrlParser: true 
    }
    //DB link --- https://cloud.mongodb.com/v2/5b8c2c7b0bd66b2b113a5dbe#clusters?tooltip=nds.security&step=0
  );
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
  