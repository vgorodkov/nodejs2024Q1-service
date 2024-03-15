import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.prisma.user.create({
        data: createUserDto,
      });
    } catch (e) {
      throw new BadRequestException('Incorrect dto');
    }
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    try {
      return await this.prisma.user.findUniqueOrThrow({ where: { id } });
    } catch {
      throw new NotFoundException("The user wasn't found");
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userToUpdate = await this.prisma.user.findUnique({ where: { id } });

    if (!userToUpdate) {
      throw new NotFoundException("The user wasn't found");
    }

    if (updateUserDto.oldPassword !== userToUpdate.password) {
      throw new ForbiddenException('Incorrect old password');
    }
    const date = new Date();
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        ...userToUpdate,
        version: userToUpdate.version + 1,
        updatedAt: date,
        password: updateUserDto.newPassword,
      },
    });

    return updatedUser;
  }

  async remove(id: string) {
    try {
      await this.prisma.user.delete({ where: { id } });
    } catch {
      throw new NotFoundException("The user wasn't found");
    }

    return;
  }
}
