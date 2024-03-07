import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';
import { IsDefined, IsInt, IsString } from 'class-validator';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @IsString()
  @IsDefined()
  name: string;

  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album

  @IsInt()
  @IsDefined()
  duration: number; // integer number
}
