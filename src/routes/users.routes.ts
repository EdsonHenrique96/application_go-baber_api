import { Router } from 'express';
import Multer from 'multer';

import multerConfigs from '../configs/multer';
import authMiddleware from '../middleware/authMiddleware';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

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
  async (request, response) => {
    try {
      const updateUserAvatarService = new UpdateUserAvatarService();

      const user = await updateUserAvatarService.execute({
        userId: request.user.id,
        avatarFileName: request.file.filename,
      });

      delete user.password;

      return response.json(user);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  },
);

export default usersRouter;
