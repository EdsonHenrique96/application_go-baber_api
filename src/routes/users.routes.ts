import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();
const createUserService = new CreateUserService();

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

export default usersRouter;
