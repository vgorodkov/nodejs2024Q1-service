import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { albums, artists, favs, tracks } from 'src/data/db';

import { Track } from 'src/track/entities/track.entity';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';

import { validateId } from 'src/utils/validateId';

@Injectable()
export class FavsService {
  private findEntityById(id: string, entities: Track[] | Album[] | Artist[]) {
    validateId(id);

    const entity = entities.find((entity) => entity.id === id);

    if (!entity) {
      throw new UnprocessableEntityException('No such entity');
    }

    return entity;
  }

  private findFavEntityIndexById(id: string, entities: string[]) {
    validateId(id);

    const entityIndex = entities.findIndex((entityId) => entityId === id);

    if (entityIndex === -1) {
      throw new NotFoundException('No such favourite entity');
    }

    return entityIndex;
  }

  createTrack(id: string) {
    const track = this.findEntityById(id, tracks);
    favs.tracks.push(id);
    return track;
  }

  createAlbum(id: string) {
    const album = this.findEntityById(id, albums);

    favs.albums.push(id);
    return album;
  }

  createArtist(id: string) {
    const artist = this.findEntityById(id, artists);

    favs.artists.push(id);
    return artist;
  }

  findAll() {
    const favAlbums = favs.albums.map((favAlbumId) =>
      albums.find((album) => favAlbumId === album.id),
    );

    const favArtists = favs.artists.map((favArtistId) =>
      artists.find((artist) => favArtistId === artist.id),
    );

    const favTracks = favs.tracks.map((favTrackId) =>
      tracks.find((track) => favTrackId === track.id),
    );

    return {
      albums: favAlbums,
      artists: favArtists,
      tracks: favTracks,
    };
  }

  removeTrack(id: string) {
    const trackIndex = this.findFavEntityIndexById(id, favs.tracks);

    favs.tracks.splice(trackIndex, 1);

    return;
  }

  removeArtist(id: string) {
    const artistIndex = this.findFavEntityIndexById(id, favs.artists);

    favs.artists.splice(artistIndex, 1);

    return;
  }

  removeAlbum(id: string) {
    const albumIndex = this.findFavEntityIndexById(id, favs.albums);

    favs.albums.splice(albumIndex, 1);

    return;
  }
}
