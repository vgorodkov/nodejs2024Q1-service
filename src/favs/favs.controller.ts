import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { validateId } from 'src/utils/validateId';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Post('track/:id')
  createTrack(@Param('id') id: string) {
    validateId(id);
    return this.favsService.createTrack(id);
  }

  @Post('album/:id')
  createAlbum(@Param('id') id: string) {
    validateId(id);
    return this.favsService.createAlbum(id);
  }

  @Post('artist/:id')
  createArtist(@Param('id') id: string) {
    validateId(id);
    return this.favsService.createArtist(id);
  }

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('track/:id')
  removeTrack(@Param('id') id: string) {
    validateId(id);
    return this.favsService.removeTrack(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('album/:id')
  removeAlbum(@Param('id') id: string) {
    validateId(id);
    return this.favsService.removeAlbum(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('artist/:id')
  removeArtist(@Param('id') id: string) {
    validateId(id);
    return this.favsService.removeArtist(id);
  }
}
