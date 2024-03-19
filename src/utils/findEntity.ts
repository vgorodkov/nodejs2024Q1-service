import { NotFoundException } from '@nestjs/common';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { validateId } from './validateId';
import { User } from 'src/user/entities/user.entity';

export function findEntityById(
  id: string,
  entities: Track[] | Album[] | Artist[] | User[],
) {
  validateId(id);

  const entity = entities.find((entity) => entity.id === id);

  if (!entity) {
    throw new NotFoundException('No such entity');
  }

  return entity;
}

export function findEntityIndexById(
  id: string,
  entities: Track[] | Album[] | Artist[] | User[],
) {
  validateId(id);

  const entityIndex = entities.findIndex(
    (entity: Track | Album | Artist | User) => entity.id === id,
  );

  if (entityIndex === -1) {
    throw new NotFoundException('No such entity');
  }

  return entityIndex;
}
