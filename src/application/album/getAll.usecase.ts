import { Inject } from '@nestjs/common';
import { AlbumInterface } from 'src/domain/album/album.interface';
import { AlbumRepositoryInterface } from 'src/domain/album/album.repository.interface';

export class GetAllAlbumUsecase {
  constructor(
    @Inject('AlbumRepositoryInterface')
    private readonly albumRepository: AlbumRepositoryInterface,
  ) {}

  public async execute(): Promise<AlbumInterface[]> {
    return await this.albumRepository.findAll();
  }
}
