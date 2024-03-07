import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';
import { IsDefined, IsInt, IsString } from 'class-validator';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @IsString()
  @IsDefined()
  name: string;

  @IsInt()
  @IsDefined()
  year: number;

  artistId: string | null; // refers to Artist
}
