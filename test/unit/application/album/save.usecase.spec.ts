import { Test, TestingModule } from '@nestjs/testing';
import { SaveAlbumUsecase } from 'src/application/album/save.usecase';
import { mockAlbumRepository, absolution } from 'test/mocks/album';

describe('application/album/get.usecase', () => {
  let useCase: SaveAlbumUsecase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SaveAlbumUsecase,
        { provide: 'AlbumRepositoryInterface', useValue: mockAlbumRepository },
      ],
    }).compile();

    useCase = module.get<SaveAlbumUsecase>(SaveAlbumUsecase);
  });

  it('should save an album and return its data', async () => {
    const result = await useCase.execute(absolution);

    expect(result).toMatchObject(absolution);
    expect(mockAlbumRepository.save).toHaveBeenCalledTimes(1);
    expect(mockAlbumRepository.save).toHaveBeenCalledWith(absolution);
  });
});
