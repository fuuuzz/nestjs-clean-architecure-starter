import { Body, Controller, Post } from '@nestjs/common';
import { SaveAlbum } from 'src/application/album/saveAlbum';
import { AlbumInterface } from 'src/domain/album/album.interface';

@Controller('albums')
export class AlbumController {
  constructor(private readonly saveAlbum: SaveAlbum) {}

  @Post()
  create(@Body() album: AlbumInterface) {
    return this.saveAlbum.execute(album);
  }
}
