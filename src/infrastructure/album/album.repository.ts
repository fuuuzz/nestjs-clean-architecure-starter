import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumRepositoryInterface } from 'src/domain/album/album.repository.interface';
import { AlbumEntity } from './album.entity';
import { Repository } from 'typeorm';
import { AlbumInterface } from 'src/domain/album/album.interface';

@Injectable()
export class AlbumRepository implements AlbumRepositoryInterface {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly repository: Repository<AlbumEntity>,
  ) {}

  public async save(album: AlbumInterface): Promise<AlbumInterface> {
    return await this.repository.save(album);
  }

  public async findOneById(id: string): Promise<AlbumInterface> {
    return await this.repository
      .createQueryBuilder('album')
      .select('*')
      .where('id = :id', { id })
      .getOne();
  }

  public async findAll(): Promise<AlbumInterface[]> {
    return await this.repository.find();
  }

  public async delete(album: AlbumInterface): Promise<AlbumInterface> {
    return await this.repository.remove(album);
  }
}
