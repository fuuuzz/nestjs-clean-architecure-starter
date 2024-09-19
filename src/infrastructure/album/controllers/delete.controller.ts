import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteAlbumUsecase } from 'src/application/album/delete.usecase';

@Controller('albums')
export class DeleteAlbumController {
  constructor(private readonly deleteAlbumUseCase: DeleteAlbumUsecase) {}

  @Delete(':id')
  public execute(@Param() { id }) {
    return this.deleteAlbumUseCase.execute(id);
  }
}
