import { Test, TestingModule } from '@nestjs/testing';
import { GetAllAlbumUsecase } from 'src/application/album/getAll.usecase';
import { AlbumEntity } from 'src/infrastructure/album/album.entity';
import { mockAlbumRepository } from 'test/mocks/album/album.repository.mock';

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
    const ids = [
      '45a421cb-f33e-4c67-91af-34cc9ce0d0b4',
      '35a421cb-f33e-4c67-91af-34cc9ce0d0b2',
    ];

    const expectedResult = [
      new AlbumEntity('Absolution', ids[0]),
      new AlbumEntity('Origin of symmetry', ids[1]),
    ];

    jest
      .spyOn(mockAlbumRepository, 'findAll')
      .mockResolvedValue(expectedResult);

    const result = await useCase.execute();

    expect(result).toMatchObject(expectedResult);
    expect(mockAlbumRepository.findAll).toHaveBeenCalledTimes(1);
  });
});
