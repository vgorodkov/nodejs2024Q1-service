import { PartialType } from '@nestjs/mapped-types';
import { CreateArtistDto } from './create-artist.dto';
import { IsBoolean, IsDefined, IsString } from 'class-validator';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsBoolean()
  grammy: boolean;
}
