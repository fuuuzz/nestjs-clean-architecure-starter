import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DeleteAlbumUsecase } from 'src/application/album/delete.usecase';
import { mockAlbumRepository, absolution } from 'test/mocks/album';

describe('application/album/delete.usecase', () => {
  let useCase: DeleteAlbumUsecase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteAlbumUsecase,
        { provide: 'AlbumRepositoryInterface', useValue: mockAlbumRepository },
      ],
    }).compile();

    useCase = module.get<DeleteAlbumUsecase>(DeleteAlbumUsecase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete a specific album according to its id', async () => {
    const result = await useCase.execute(absolution.id);

    expect(result).toMatchObject({ title: absolution.title });
    expect(mockAlbumRepository.findOneById).toHaveBeenCalledTimes(1);
    expect(mockAlbumRepository.findOneById).toHaveBeenCalledWith(absolution.id);
    expect(mockAlbumRepository.delete).toHaveBeenCalledTimes(1);
    expect(mockAlbumRepository.delete).toHaveBeenCalledWith(absolution);
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
