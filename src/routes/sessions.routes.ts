import { Router } from 'express';

import CreateSessionService, {
  SessionInfos,
} from '../services/CreateSessionService';

const sessionsRouter = Router();
const createSessionService = new CreateSessionService();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const sessionInfos: SessionInfos = await createSessionService.execute({
    email,
    password,
  });

  return response.status(201).json(sessionInfos);
});

export default sessionsRouter;
