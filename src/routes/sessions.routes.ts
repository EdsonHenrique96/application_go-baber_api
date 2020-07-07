import { Router } from 'express';

import CreateSessionService, {
  SessionInfos,
} from '../services/CreateSessionService';

const sessionsRouter = Router();
const createSessionService = new CreateSessionService();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const sessionInfos: SessionInfos = await createSessionService.execute({
      email,
      password,
    });

    return response.status(201).json(sessionInfos);
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
});

export default sessionsRouter;
