import { Body, Controller, Param, Put } from '@nestjs/common';
import { SaveAlbumUsecase } from 'src/application/album/save.usecase';
import { AlbumInterface } from 'src/domain/album/album.interface';

@Controller('albums')
export class UpdateAlbumController {
  constructor(private readonly saveAlbumUsecase: SaveAlbumUsecase) {}

  @Put(':id')
  public execute(@Param() { id }, @Body() album: AlbumInterface) {
    return this.saveAlbumUsecase.execute({ id, ...album });
  }
}
