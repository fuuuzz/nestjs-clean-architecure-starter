import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './album.entity';
import { AlbumController } from './controllers/create.controller';
import { SaveAlbum } from 'src/application/album/saveAlbum';
import { AlbumRepository } from './album.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity])],
  controllers: [AlbumController],
  providers: [
    { provide: 'AlbumRepositoryInterface', useClass: AlbumRepository },
    SaveAlbum,
  ],
})
export class AlbumModule {}
