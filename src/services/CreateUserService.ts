import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
  }: CreateUserDTO): Promise<User> {
    const userRepository = getRepository(User);

    const userExists = await userRepository.findOne({ where: { email } });

    if (userExists) {
      throw new Error('Email adress already used');
    }

    const passwordHashed = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: passwordHashed,
    });

    await userRepository.save(user);
    delete user.password;

    return user;
  }
}

export default CreateUserService;
