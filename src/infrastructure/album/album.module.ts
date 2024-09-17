import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './album.entity';
import { CreateAlbumController } from './controllers/create.controller';
import { SaveAlbumUseCase } from 'src/application/album/save.use-case';
import { AlbumRepository } from './album.repository';
import { UpdateAlbumController } from './controllers/update.controller';
import { GetAlbumUseCase } from 'src/application/album/get.use-case';
import { GetAlbumController } from './controllers/get.controller';
import { GetAllAlbumController } from './controllers/getAll.controller';
import { GetAllAlbumUseCase } from 'src/application/album/getAll.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity])],
  controllers: [
    CreateAlbumController,
    UpdateAlbumController,
    GetAlbumController,
    GetAllAlbumController,
  ],
  providers: [
    { provide: 'AlbumRepositoryInterface', useClass: AlbumRepository },
    SaveAlbumUseCase,
    GetAlbumUseCase,
    GetAllAlbumUseCase,
  ],
})
export class AlbumModule {}
