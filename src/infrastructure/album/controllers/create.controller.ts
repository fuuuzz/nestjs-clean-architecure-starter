import { Body, Controller, Post } from '@nestjs/common';
import { SaveAlbumUseCase } from 'src/application/album/save.use-case';
import { AlbumInterface } from 'src/domain/album/album.interface';

@Controller('albums')
export class CreateAlbumController {
  constructor(private readonly saveAlbumUseCase: SaveAlbumUseCase) {}

  @Post()
  public async execute(@Body() album: AlbumInterface) {
    return await this.saveAlbumUseCase.execute(album);
  }
}
