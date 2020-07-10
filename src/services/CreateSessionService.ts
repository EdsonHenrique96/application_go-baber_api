import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { SECRET_KEY } from '../configs/auth';
import User from '../models/User';

import AppError from '../errors/AppError';
import AppErrorTypes from '../errors/types/AppErrorTypes';

interface CreateSessionServiceDTO {
  email: string;
  password: string;
}

export interface SessionInfos {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

class CreateSessionService {
  public async execute({
    email,
    password,
  }: CreateSessionServiceDTO): Promise<SessionInfos> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError({
        message: 'Incorrect email or password ',
        type: AppErrorTypes.INCORRECT_EMAIL_OR_PASSWORD,
      });
    }

    const passwordIsCorrect = await compare(password, user.password);

    if (!passwordIsCorrect) {
      throw new AppError({
        message: 'Incorrect email or password ',
        type: AppErrorTypes.INCORRECT_EMAIL_OR_PASSWORD,
      });
    }

    const token = sign({}, SECRET_KEY, { expiresIn: '1d', subject: user.id });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    };
  }
}

export default CreateSessionService;
