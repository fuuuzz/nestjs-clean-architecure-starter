import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { GetAlbumUsecase } from 'src/application/album/get.usecase';
import { mockAlbumRepository, absolution } from 'test/mocks/album';

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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a specific album', async () => {
    const result = await useCase.execute(absolution.id);

    expect(result).toMatchObject(absolution);
    expect(mockAlbumRepository.findOneById).toHaveBeenCalledTimes(1);
    expect(mockAlbumRepository.findOneById).toHaveBeenCalledWith(absolution.id);
  });

  it('should fail when album does not exist', async () => {
    jest.spyOn(mockAlbumRepository, 'findOneById').mockResolvedValue(null);

    try {
      await useCase.execute(absolution.id);
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
      expect(mockAlbumRepository.findOneById).toHaveBeenCalledTimes(1);
      expect(mockAlbumRepository.findOneById).toHaveBeenCalledWith(
        absolution.id,
      );
      expect(mockAlbumRepository.delete).toHaveBeenCalledTimes(0);
    }
  });
});
