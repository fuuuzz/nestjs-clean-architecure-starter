import { Controller, Get, Param } from '@nestjs/common';
import { GetAlbumUseCase } from 'src/application/album/get.use-case';

@Controller('albums')
export class GetAlbumController {
  constructor(private readonly getAlbumUseCase: GetAlbumUseCase) {}

  @Get(':id')
  public execute(@Param() { id }) {
    return this.getAlbumUseCase.execute(id);
  }
}
