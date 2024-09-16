import { Album } from './album.entity';

export interface AlbumRepositoryInterface {
  insert(album: Album): Promise<Album>;
  findOneById(id: string): Promise<Album>;
  findAll(): Promise<Album[]>;
  delete(id: string): Promise<void>;
}
