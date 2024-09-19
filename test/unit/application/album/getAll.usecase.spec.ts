import { Test, TestingModule } from '@nestjs/testing';
import { GetAllAlbumUsecase } from 'src/application/album/getAll.usecase';
import { AlbumEntity } from 'src/infrastructure/album/album.entity';
import { AlbumRepository } from 'src/infrastructure/album/album.repository';
import {
  mockAlbumRepository,
  absolution,
  originOfSymmetry,
} from 'test/mocks/album';
import { Repository } from 'typeorm';

describe('application/album/getAll.usecase', () => {
  let useCase: GetAllAlbumUsecase;
  let albumRepository: AlbumRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllAlbumUsecase,
        { provide: 'AlbumRepositoryInterface', useClass: AlbumRepository },
      ],
    }).compile();

    useCase = module.get<GetAllAlbumUsecase>(GetAllAlbumUsecase);
    albumRepository = module.get<AlbumRepository>(AlbumRepository);
  });

  it('should return all albums', async () => {
    jest
      .spyOn(albumRepository, 'findAll')
      .mockResolvedValue([absolution, originOfSymmetry]);

    const result = await useCase.execute();

    expect(result).toMatchObject([absolution, originOfSymmetry]);
    expect(albumRepository.findAll).toHaveBeenCalledTimes(1);
  });
});
