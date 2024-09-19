import { AlbumRepositoryInterface } from 'src/domain/album/album.repository.interface';

export const mockAlbumRepository: AlbumRepositoryInterface = {
  save: jest.fn(),
  findOneById: jest.fn(),
  findAll: jest.fn(),
  delete: jest.fn(),
};
