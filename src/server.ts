/**
 * `reflact-matadata` dever ser importado no primeiro arquivo da aplicação,
 * ele é uma dependencia do typeorm para dar suporte no uso de decorator com ts.
 *
 * Na própria doc do typeorm é solicitado a instalação:
 * @see https://typeorm.io/#/undefined/installation
 */
import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
/**
 * Por padrão o express não da suporte a capturar erros de funções async
 * no middleware.
 * o módulo abaixo axilia nisso.
 */
import 'express-async-errors';
import routes from './routes';

import './database';
import multerConfigs from './configs/multer';

import AppError from './errors/AppError';
import HttpErrors from './routes/errors/httpErrors';

const api = express();

api.use(express.json());
api.use('/files', express.static(multerConfigs.directory));
api.use(routes);

api.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response
        .status(HttpErrors[error.type])
        .json({ message: error.message });
    }

    return response.status(500).json({ message: error.message });
  },
);

api.listen(3333, () => {
  console.log('🚀 Server started on port 3333');
});
