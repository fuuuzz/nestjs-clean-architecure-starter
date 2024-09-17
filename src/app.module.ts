import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from './infrastructure/album/album.module';
import { typeormConfig } from './infrastructure/persistence/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeormConfig),
    AlbumModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
