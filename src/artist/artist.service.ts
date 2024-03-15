import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { albums, artists, favs, tracks } from 'src/data/db';
import { Artist } from './entities/artist.entity';
import { v4 } from 'uuid';
import { findEntityById, findEntityIndexById } from 'src/utils/findEntity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async create(createArtistDto: CreateArtistDto) {
    return await this.prisma.artist.create({ data: createArtistDto });
  }

  async findAll() {
    return await this.prisma.artist.findMany();
  }

  async findOne(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });

    if (!artist) {
      throw new NotFoundException("The artist wasn't found");
    }

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const editedArtist = {
      id,
      ...updateArtistDto,
    };

    try {
      await this.prisma.artist.update({ where: { id }, data: editedArtist });
    } catch {
      throw new NotFoundException("The artist wasn't found");
    }

    return editedArtist;
  }

  async remove(id: string) {
    try {
      await this.prisma.artist.delete({ where: { id } });
    } catch {
      throw new NotFoundException("The artist wasn't found");
    }
    await this.prisma.album.updateMany({
      where: { artistId: id },
      data: { artistId: null },
    });
    await this.prisma.track.updateMany({
      where: { artistId: id },
      data: { artistId: id },
    });

    await this.prisma.favorites.updateMany({
      where: { artists: { has: id } },
      data: { artists: { set: [] } },
    });

    return;
  }
}
