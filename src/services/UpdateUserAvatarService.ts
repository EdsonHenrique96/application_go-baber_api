import path from 'path';
import fs from 'fs';
import { getRepository } from 'typeorm';

import User from '../models/User';
import multerConfigs from '../configs/multer';

interface UpdateUserAvatarServiceDTO {
  userId: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({
    userId,
    avatarFileName,
  }: UpdateUserAvatarServiceDTO): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(userId);

    if (!user) {
      throw new Error('Only authenticated users can updated the avatar');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(
        multerConfigs.directory,
        user.avatar,
      );
      const fileExists = await fs.promises.stat(userAvatarFilePath);

      if (fileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
