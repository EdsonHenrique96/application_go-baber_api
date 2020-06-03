import express from 'express';
import routes from './routes';

const api = express();

api.use(express.json());
api.use(routes);

api.listen(3333, () => {
  console.log('🚀 Server started on port 3333');
});
