import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { users } from 'src/data/db';
import { User } from './entities/user.entity';
import { v4 } from 'uuid';
import { findEntityById, findEntityIndexById } from 'src/utils/findEntity';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    const user: User = {
      id: v4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    users.push(user);

    return user;
  }

  findAll() {
    return users;
  }

  findOne(id: string) {
    const user = findEntityById(id, users);

    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = findEntityById(id, users) as User;

    if (updateUserDto.oldPassword !== user.password) {
      throw new ForbiddenException('Incorrect old password');
    }

    const editedPasswordUser = {
      ...user,
      password: updateUserDto.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };

    const userIndex = findEntityIndexById(id, users);
    users[userIndex] = editedPasswordUser;

    return editedPasswordUser;
  }

  remove(id: string) {
    const userIndex = findEntityIndexById(id, users);

    users.splice(userIndex, 1);

    return;
  }
}
