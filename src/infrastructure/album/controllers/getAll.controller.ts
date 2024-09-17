import { Controller, Get } from '@nestjs/common';
import { GetAllAlbumUseCase } from 'src/application/album/getAll.use-case';

@Controller('albums')
export class GetAllAlbumController {
  constructor(private readonly getAllAlbumUseCase: GetAllAlbumUseCase) {}

  @Get()
  public execute() {
    return this.getAllAlbumUseCase.execute();
  }
}
