/**
 * `reflact-matadata` dever ser importado no primeiro arquivo da aplicação,
 * ele é uma dependencia do typeorm para dar suporte no uso de decorator com ts.
 *
 * Na própria doc do typeorm é solicitado a instalação:
 * @see https://typeorm.io/#/undefined/installation
 */
import 'reflect-metadata';

import express from 'express';
import routes from './routes';

import './database';
import multerConfigs from './configs/multer';

const api = express();

api.use(express.json());
api.use('/files', express.static(multerConfigs.directory));
api.use(routes);

api.listen(3333, () => {
  console.log('🚀 Server started on port 3333');
});
