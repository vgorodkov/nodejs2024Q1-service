import { IsDefined, IsInt, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsDefined()
  name: string;

  @IsInt()
  @IsDefined()
  year: number;

  artistId: string | null; // refers to Artist
}
