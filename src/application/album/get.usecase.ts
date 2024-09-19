import { Inject } from '@nestjs/common';
import { AlbumInterface } from 'src/domain/album/album.interface';
import { AlbumRepositoryInterface } from 'src/domain/album/album.repository.interface';

export class GetAlbumUsecase {
  constructor(
    @Inject('AlbumRepositoryInterface')
    private readonly albumRepository: AlbumRepositoryInterface,
  ) {}

  async execute(id: string): Promise<AlbumInterface> {
    return await this.albumRepository.findOneById(id);
  }
}
