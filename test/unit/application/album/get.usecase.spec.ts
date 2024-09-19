import { Test, TestingModule } from '@nestjs/testing';
import { GetAlbumUsecase } from 'src/application/album/get.usecase';
import { AlbumEntity } from 'src/infrastructure/album/album.entity';
import { mockAlbumRepository } from 'test/mocks/album/album.repository.mock';

describe('application/album/get.usecase', () => {
  let useCase: GetAlbumUsecase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAlbumUsecase,
        { provide: 'AlbumRepositoryInterface', useValue: mockAlbumRepository },
      ],
    }).compile();

    useCase = module.get<GetAlbumUsecase>(GetAlbumUsecase);
  });

  it('should return a specific album', async () => {
    const id = '45a421cb-f33e-4c67-91af-34cc9ce0d0b4';
    const expectedResult = new AlbumEntity('Absolution', id);

    jest
      .spyOn(mockAlbumRepository, 'findOneById')
      .mockResolvedValue(expectedResult);

    const result = await useCase.execute(id);

    expect(result).toMatchObject(expectedResult);
    expect(mockAlbumRepository.findOneById).toHaveBeenCalledTimes(1);
    expect(mockAlbumRepository.findOneById).toHaveBeenCalledWith(id);
  });
});
