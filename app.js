import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

class App {
  constructor() {
    this.mongooseConnect();
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(cookieParser())
    this.app.use(morgan('env'));

    routes(this.app);
  }

  mongooseConnect() {
    mongoose.connect('mongodb://localhost/mydb',
    {
      useNewUrlParser: true
    });
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