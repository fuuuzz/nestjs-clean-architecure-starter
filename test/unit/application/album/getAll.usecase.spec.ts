import { Test, TestingModule } from '@nestjs/testing';
import { GetAllAlbumUsecase } from 'src/application/album/getAll.usecase';
import {
  mockAlbumRepository,
  absolution,
  originOfSymmetry,
} from 'test/mocks/album';

describe('application/album/getAll.usecase', () => {
  let useCase: GetAllAlbumUsecase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllAlbumUsecase,
        { provide: 'AlbumRepositoryInterface', useValue: mockAlbumRepository },
      ],
    }).compile();

    useCase = module.get<GetAllAlbumUsecase>(GetAllAlbumUsecase);
  });

  it('should return all albums', async () => {
    const result = await useCase.execute();

    expect(result).toMatchObject([absolution, originOfSymmetry]);
    expect(mockAlbumRepository.findAll).toHaveBeenCalledTimes(1);
  });
});
