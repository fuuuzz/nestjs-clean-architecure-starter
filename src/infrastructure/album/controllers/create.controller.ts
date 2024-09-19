import { Body, Controller, Post } from '@nestjs/common';
import { SaveAlbumUsecase } from 'src/application/album/save.usecase';
import { AlbumInterface } from 'src/domain/album/album.interface';

@Controller('albums')
export class CreateAlbumController {
  constructor(private readonly saveAlbumUsecase: SaveAlbumUsecase) {}

  @Post()
  public async execute(@Body() album: AlbumInterface) {
    return await this.saveAlbumUsecase.execute(album);
  }
}
