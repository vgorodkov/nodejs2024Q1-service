import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async create(createTrackDto: CreateTrackDto) {
    try {
      return await this.prisma.track.create({ data: createTrackDto });
    } catch (e) {
      throw new NotFoundException("Artist or Album with this id wasn't found");
    }
  }

  async findAll() {
    return await this.prisma.track.findMany();
  }

  async findOne(id: string) {
    try {
      return await this.prisma.track.findUniqueOrThrow({ where: { id } });
    } catch {
      throw new NotFoundException("The track wasn't found");
    }
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    try {
      return await this.prisma.track.update({
        where: { id },
        data: updateTrackDto,
      });
    } catch {
      throw new NotFoundException("The track wasn't found");
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.favorites.updateMany({
        where: { tracks: { has: id } },
        data: { tracks: { set: [] } },
      });
      return await this.prisma.track.delete({ where: { id } });
    } catch {
      throw new NotFoundException("The track wasn't found");
    }
  }
}
