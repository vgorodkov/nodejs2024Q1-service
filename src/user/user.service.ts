import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { users } from 'src/data/db';
import { User } from './entities/user.entity';
import { v4, validate } from 'uuid';

@Injectable()
export class UserService {
  private findUserById(id: string): User {
    if (!validate(id)) {
      throw new BadRequestException('Invalid id format. UUID v4 is requested');
    }
    const user = users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('There is no such user');
    }
    return user;
  }

  private findUserIndexById(id: string): number {
    const userToDeleteIndex = users.findIndex((user) => user.id === id);
    if (userToDeleteIndex === -1) {
      throw new NotFoundException('There is no such user');
    }
    return userToDeleteIndex;
  }

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
    const user = this.findUserById(id);

    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.findUserById(id);

    if (updateUserDto.oldPassword !== user.password) {
      throw new ForbiddenException('Incorrect old password');
    }

    const editedPasswordUser = {
      ...user,
      password: updateUserDto.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };

    const userIndex = this.findUserIndexById(id);
    users[userIndex] = editedPasswordUser;

    return editedPasswordUser;
  }

  remove(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid id format. UUID v4 is requested');
    }

    const userIndex = this.findUserIndexById(id);

    users.splice(userIndex, 1);

    return;
  }
}
