import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Fav } from 'src/favs/entities/fav.entity';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';

export const users: User[] = [];

export const artists: Artist[] = [];

export const tracks: Track[] = [];

export const albums: Album[] = [];

export const favs: Fav = {
  albums: [],
  artists: [],
  tracks: [],
};
