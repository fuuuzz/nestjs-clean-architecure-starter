import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './album.entity';
import { CreateAlbumController } from './controllers/create.controller';
import { SaveAlbumUsecase } from 'src/application/album/save.usecase';
import { AlbumRepository } from './album.repository';
import { UpdateAlbumController } from './controllers/update.controller';
import { GetAlbumUsecase } from 'src/application/album/get.usecase';
import { GetAlbumController } from './controllers/get.controller';
import { GetAllAlbumController } from './controllers/getAll.controller';
import { GetAllAlbumUsecase } from 'src/application/album/getAll.usecase';
import { DeleteAlbumController } from './controllers/delete.controller';
import { DeleteAlbumUsecase } from 'src/application/album/delete.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity])],
  controllers: [
    CreateAlbumController,
    UpdateAlbumController,
    GetAlbumController,
    GetAllAlbumController,
    DeleteAlbumController,
  ],
  providers: [
    { provide: 'AlbumRepositoryInterface', useClass: AlbumRepository },
    SaveAlbumUsecase,
    GetAlbumUsecase,
    GetAllAlbumUsecase,
    DeleteAlbumUsecase,
  ],
})
export class AlbumModule {}
