import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { favs, tracks } from 'src/data/db';
import { v4 } from 'uuid';

import { findEntityById, findEntityIndexById } from 'src/utils/findEntity';

@Injectable()
export class TrackService {
  create(createTrackDto: CreateTrackDto) {
    const newTrack = {
      id: v4(),
      name: createTrackDto.name,
      artistId: createTrackDto.artistId || null,
      albumId: createTrackDto.albumId || null,
      duration: createTrackDto.duration,
    };

    tracks.push(newTrack);

    return newTrack;
  }

  findAll() {
    return tracks;
  }

  findOne(id: string) {
    const track = findEntityById(id, tracks);
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const trackIndex = findEntityIndexById(id, tracks);
    const track = tracks[trackIndex];

    const editedTrack = {
      ...track,
      ...updateTrackDto,
    };

    tracks[trackIndex] = editedTrack;

    return editedTrack;
  }

  remove(id: string) {
    const trackIndex = findEntityIndexById(id, tracks);
    tracks.splice(trackIndex, 1);

    const favIndex = favs.tracks.findIndex((favId) => favId === id);
    if (favIndex !== -1) {
      favs.tracks.splice(favIndex, 1);
    }

    return;
  }
}
