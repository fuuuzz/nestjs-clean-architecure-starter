import { Controller, Get, Param } from '@nestjs/common';
import { GetAlbumUsecase } from 'src/application/album/get.usecase';

@Controller('albums')
export class GetAlbumController {
  constructor(private readonly getAlbumUsecase: GetAlbumUsecase) {}

  @Get(':id')
  public execute(@Param() { id }) {
    return this.getAlbumUsecase.execute(id);
  }
}
