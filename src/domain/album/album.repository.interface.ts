import { AlbumInterface } from './album.interface';

export interface AlbumRepositoryInterface {
  save(album: AlbumInterface): Promise<AlbumInterface>;
  findOneById(id: string): Promise<AlbumInterface>;
  findAll(): Promise<AlbumInterface[]>;
  delete(album: AlbumInterface): Promise<AlbumInterface>;
}
