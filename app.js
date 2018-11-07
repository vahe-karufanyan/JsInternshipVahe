import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import routes from './routes';

mongoose.connect('mongodb://localhost/mydb',
  {
    useNewUrlParser: true,
  });

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('env'));

routes(this.app);

app.listen(3000, () => {
  console.log('Server is up!');
});

export default app;
