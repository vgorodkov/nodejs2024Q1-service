import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { artists } from 'src/data/db';
import { Artist } from './entities/artist.entity';
import { v4, validate } from 'uuid';


@Injectable()
export class ArtistService {

  private findArtistById(id: string): Artist {
    if (!validate(id)) {
      throw new BadRequestException('Invalid id format. UUID v4 is requested');
    }
    const artist = artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException('There is no such user');
    }
    return artist;
  }

  private findArtistIndexById(id: string): number {
    const artistToDeleteIndex = artists.findIndex((artist) => artist.id === id);
    if (artistToDeleteIndex === -1) {
      throw new NotFoundException('There is no such user');
    }
    return artistToDeleteIndex;
  }


  create(createArtistDto: CreateArtistDto) {
    const artist: Artist = {
      id: v4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy
    };
    artists.push(artist);

    return artist;
  }

  findAll() {
    return artists
  }

  findOne(id: string) {
    const artist = this.findArtistById(id)
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.findArtistById(id)

    const editedArtist = {
      ...artist,
      ...updateArtistDto
    }

    const artistIndex = this.findArtistIndexById(id)

    artists[artistIndex] = editedArtist

    return editedArtist;
  }

  remove(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid id format. UUID v4 is requested');
    }

    const artistIndex = this.findArtistIndexById(id);

    artists.splice(artistIndex, 1);

    return;
  }
}
