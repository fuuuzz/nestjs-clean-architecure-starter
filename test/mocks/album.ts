import { AlbumRepositoryInterface } from 'src/domain/album/album.repository.interface';
import { AlbumEntity } from 'src/infrastructure/album/album.entity';

export const absolution = new AlbumEntity(
  'Absolution',
  'af402450-ca1a-4e41-ae34-c80b1a85c933',
);
export const originOfSymmetry = new AlbumEntity(
  'Origin of symmetry',
  'ed6ef473-5fb3-4060-b4ae-18a3f9c7e393',
);

export const mockAlbumRepository: AlbumRepositoryInterface = {
  save: jest.fn().mockResolvedValue(absolution),
  findOneById: jest.fn().mockResolvedValue(absolution),
  findAll: jest.fn().mockResolvedValue([absolution, originOfSymmetry]),
  delete: jest.fn().mockResolvedValue({ title: absolution.title }),
};
