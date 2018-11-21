import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import routes from './routes';

const app = express();
const whitelist = ['http://localhost:3000', 'http://localhost:4200'];

mongoose.connect('mongodb://localhost/mydb',
  {
    useNewUrlParser: true,
  });


app.use(cors({ origin: whitelist }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('env'));

routes(app);

app.listen(3000, () => {
  console.log('Server is up!');
});

export default app;
