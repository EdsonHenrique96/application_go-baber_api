import { Router } from 'express';
import Multer from 'multer';

import multerConfigs from '../configs/multer';
import CreateUserService from '../services/CreateUserService';
import authMiddleware from '../middleware/authMiddleware';

const usersRouter = Router();
const createUserService = new CreateUserService();

const multer = Multer(multerConfigs);

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const userCreated = await createUserService.execute({
      name,
      email,
      password,
    });

    return response.status(201).json(userCreated);
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
});

usersRouter.patch(
  '/avatar',
  authMiddleware,
  multer.single('avatar'),
  (request, response) => {
    return response.json(request.file);
  },
);

export default usersRouter;
