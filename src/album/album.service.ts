import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { albums, favs, tracks } from 'src/data/db';

import { v4 } from 'uuid';
import { findEntityById, findEntityIndexById } from 'src/utils/findEntity';

@Injectable()
export class AlbumService {
  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = {
      id: v4(),
      ...createAlbumDto,
    };
    albums.push(newAlbum);
    return newAlbum;
  }

  findAll() {
    return albums;
  }

  findOne(id: string) {
    const album = findEntityById(id, albums);
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const albumIndex = findEntityIndexById(id, albums);
    const editedAlbum = {
      id,
      ...updateAlbumDto,
    };

    albums[albumIndex] = editedAlbum;

    return editedAlbum;
  }

  remove(id: string) {
    const albumIndex = findEntityIndexById(id, albums);
    const trackIndex = tracks.findIndex((track) => track.albumId === id);
    if (trackIndex !== -1) {
      tracks[trackIndex].albumId = null;
    }
    const favIndex = favs.albums.findIndex((favId) => favId === id);
    if (favIndex !== -1) {
      favs.albums.splice(favIndex, 1);
    }
    albums.splice(albumIndex, 1);
    return;
  }
}
