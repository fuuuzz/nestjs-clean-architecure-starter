import { Body, Controller, Param, Put } from '@nestjs/common';
import { SaveAlbumUseCase } from 'src/application/album/save.use-case';
import { AlbumInterface } from 'src/domain/album/album.interface';

@Controller('albums')
export class UpdateAlbumController {
  constructor(private readonly saveAlbumUseCase: SaveAlbumUseCase) {}

  @Put(':id')
  public execute(@Param() { id }, @Body() album: AlbumInterface) {
    return this.saveAlbumUseCase.execute({ id, ...album });
  }
}
