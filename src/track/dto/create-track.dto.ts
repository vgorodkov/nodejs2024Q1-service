import { IsDefined, IsInt, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsDefined()
  name: string;

  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album

  @IsInt()
  @IsDefined()
  duration: number; // integer number
}
