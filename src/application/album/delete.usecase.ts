import { Inject, NotFoundException } from '@nestjs/common';
import { AlbumInterface } from 'src/domain/album/album.interface';
import { AlbumRepositoryInterface } from 'src/domain/album/album.repository.interface';

export class DeleteAlbumUsecase {
  constructor(
    @Inject('AlbumRepositoryInterface')
    private readonly albumRepository: AlbumRepositoryInterface,
  ) {}

  async execute(id: string): Promise<AlbumInterface> {
    const album = await this.albumRepository.findOneById(id);

    if (!album) {
      throw new NotFoundException();
    }

    return await this.albumRepository.delete(album);
  }
}
