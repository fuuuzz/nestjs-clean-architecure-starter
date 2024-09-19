import { Test, TestingModule } from '@nestjs/testing';
import { SaveAlbumUsecase } from 'src/application/album/save.usecase';
import { AlbumEntity } from 'src/infrastructure/album/album.entity';
import { mockAlbumRepository } from 'test/mocks/album/album.repository.mock';

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
    const id = '45a421cb-f33e-4c67-91af-34cc9ce0d0b4';
    const title = 'Absolution';
    const expectedResult = new AlbumEntity(title, id);

    jest.spyOn(mockAlbumRepository, 'save').mockResolvedValue(expectedResult);

    const result = await useCase.execute({ title });

    expect(result).toMatchObject(expectedResult);
    expect(mockAlbumRepository.save).toHaveBeenCalledTimes(1);
    expect(mockAlbumRepository.save).toHaveBeenCalledWith({ title });
  });
});
