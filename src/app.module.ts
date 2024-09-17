import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from './infrastructure/album/album.module';
import { typeormConfig } from './infrastructure/persistence/typeorm.config';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeormConfig),
    AlbumModule,
    RouterModule.register([
      {
        path: '/api',
        module: AlbumModule,
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
