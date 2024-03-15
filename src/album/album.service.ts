import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    try {
      return await this.prisma.album.create({ data: createAlbumDto });
    } catch {
      throw new NotFoundException("Artist with this id wasn't found");
    }
  }

  async findAll() {
    return await this.prisma.album.findMany();
  }

  async findOne(id: string) {
    const album = await this.prisma.album.findUnique({
      where: {
        id: id,
      },
    });
    if (!album) {
      throw new NotFoundException("The album wasn't found");
    }
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const editedAlbum = {
      id,
      ...updateAlbumDto,
    };

    try {
      await this.prisma.album.update({
        where: { id: id },
        data: editedAlbum,
      });
    } catch {
      throw new NotFoundException("The album wasn't not found");
    }

    return editedAlbum;
  }

  async remove(id: string) {
    try {
      await this.prisma.album.delete({ where: { id } });
    } catch {
      throw new NotFoundException("The album wasn't not found");
    }

    await this.prisma.track.updateMany({
      where: { albumId: id },
      data: { albumId: null },
    });

    await this.prisma.favorites.updateMany({
      where: { albums: { has: id } },
      data: { albums: { set: [] } },
    });

    return;
  }
}
