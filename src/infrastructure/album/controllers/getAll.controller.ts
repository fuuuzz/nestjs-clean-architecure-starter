import { Controller, Get } from '@nestjs/common';
import { GetAllAlbumUsecase } from 'src/application/album/getAll.usecase';

@Controller('albums')
export class GetAllAlbumController {
  constructor(private readonly getAllAlbumUsecase: GetAllAlbumUsecase) {}

  @Get()
  public execute() {
    return this.getAllAlbumUsecase.execute();
  }
}
