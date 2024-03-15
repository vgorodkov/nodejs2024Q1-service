import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { albums, artists, favs, tracks } from 'src/data/db';

import { Track } from 'src/track/entities/track.entity';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';

import { validateId } from 'src/utils/validateId';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavsService {
  constructor(private prisma: PrismaService) {}

  async createTrack(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) {
      throw new UnprocessableEntityException('No such entity');
    }

    const isFavsExist = !!(await this.prisma.favorites.findFirst());
    const favorites = await this.prisma.favorites.findMany();
    const isAlreadyInFavs = favorites[0].tracks.includes(id);

    if (isAlreadyInFavs) {
      throw new BadRequestException('This entity is already in favourites');
    }

    if (!isFavsExist) {
      await this.prisma.favorites.create({
        data: {
          tracks: [id],
        },
      });
    } else {
      await this.prisma.favorites.updateMany({
        data: {
          tracks: {
            push: id,
          },
        },
      });
    }

    return track;
  }

  async createAlbum(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) {
      throw new UnprocessableEntityException('No such entity');
    }

    const isFavsExist = !!(await this.prisma.favorites.findFirst());
    const favorites = await this.prisma.favorites.findMany();
    const isAlreadyInFavs = favorites[0].albums.includes(id);

    if (isAlreadyInFavs) {
      throw new BadRequestException('This entity is already in favourites');
    }

    if (!isFavsExist) {
      await this.prisma.favorites.create({
        data: {
          albums: [id],
        },
      });
    } else {
      await this.prisma.favorites.updateMany({
        data: {
          albums: {
            push: id,
          },
        },
      });
    }

    return album;
  }

  async createArtist(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) {
      throw new UnprocessableEntityException('No such entity');
    }

    const isFavsExist = !!(await this.prisma.favorites.findFirst());
    const favorites = await this.prisma.favorites.findMany();
    const isAlreadyInFavs = favorites[0].artists.includes(id);

    if (isAlreadyInFavs) {
      throw new BadRequestException('This entity is already in favourites');
    }

    if (!isFavsExist) {
      await this.prisma.favorites.create({
        data: {
          artists: [id],
        },
      });
    } else {
      await this.prisma.favorites.updateMany({
        data: {
          artists: {
            push: id,
          },
        },
      });
    }

    return artist;
  }

  async findAll() {
    const favs = await this.prisma.favorites.findMany();

    const favAlbums = await Promise.all(
      favs[0].albums.map(async (favAlbumId) => {
        const album = await this.prisma.album.findUnique({
          where: { id: favAlbumId },
        });
        return album;
      }),
    );

    const favArtists = await Promise.all(
      favs[0].artists.map(async (favArtistId) => {
        const artist = await this.prisma.artist.findUnique({
          where: { id: favArtistId },
        });
        return artist;
      }),
    );

    const favTracks = await Promise.all(
      favs[0].tracks.map(async (favTrackId) => {
        const track = await this.prisma.track.findUnique({
          where: { id: favTrackId },
        });
        return track;
      }),
    );

    return {
      albums: favAlbums,
      artists: favArtists,
      tracks: favTracks,
    };
  }

  async removeTrack(id: string) {
    await this.prisma.favorites.updateMany({
      where: { tracks: { has: id } },
      data: { tracks: { set: [] } },
    });
    return;
  }

  async removeArtist(id: string) {
    await this.prisma.favorites.updateMany({
      where: { artists: { has: id } },
      data: { artists: { set: [] } },
    });
    return;
  }

  async removeAlbum(id: string) {
    await this.prisma.favorites.updateMany({
      where: { albums: { has: id } },
      data: { albums: { set: [] } },
    });
    return;
  }
}
