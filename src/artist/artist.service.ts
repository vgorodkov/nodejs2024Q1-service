import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { albums, artists, favs, tracks } from 'src/data/db';
import { Artist } from './entities/artist.entity';
import { v4, validate } from 'uuid';
import { findEntityById, findEntityIndexById } from 'src/utils/findEntity';

@Injectable()
export class ArtistService {
  create(createArtistDto: CreateArtistDto) {
    const artist: Artist = {
      id: v4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    };
    artists.push(artist);

    return artist;
  }

  findAll() {
    return artists;
  }

  findOne(id: string) {
    const artist = findEntityById(id, artists);
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const editedArtist = {
      id,
      ...updateArtistDto,
    };

    const artistIndex = findEntityIndexById(id, artists);

    artists[artistIndex] = editedArtist;

    return editedArtist;
  }

  remove(id: string) {
    const artistIndex = findEntityIndexById(id, artists);
    const trackIndex = tracks.findIndex((track) => track.artistId === id);
    const albumIndex = albums.findIndex((album) => album.artistId === id);

    if (albumIndex !== -1) {
      albums[albumIndex].artistId = null;
    }

    if (trackIndex !== -1) {
      tracks[trackIndex].artistId = null;
    }

    const favIndex = favs.artists.findIndex((favId) => favId === id);
    if (favIndex !== -1) {
      favs.artists.splice(favIndex, 1);
    }
    artists.splice(artistIndex, 1);

    return;
  }
}
