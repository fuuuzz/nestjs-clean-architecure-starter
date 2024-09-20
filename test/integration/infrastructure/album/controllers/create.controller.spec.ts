import { SaveAlbumUsecase } from 'src/application/album/save.usecase';
import { AlbumEntity } from 'src/infrastructure/album/album.entity';
import { AlbumRepository } from 'src/infrastructure/album/album.repository';
import { CreateAlbumController } from 'src/infrastructure/album/controllers/create.controller';
import * as request from 'supertest';
import { absolution } from 'test/mocks/album';

describe('infrastructure/album/controllers/create.controller', () => {
  beforeAll(async () => {
    await global.setAppModule(
      AlbumEntity,
      SaveAlbumUsecase,
      AlbumRepository,
      'AlbumRepositoryInterface',
      CreateAlbumController,
    );
  });

  it('should create an album', async () => {
    const { body, status } = await request(global.app.getHttpServer())
      .post(`/albums/`)
      .send(absolution);

    expect(status).toBe(201);
    expect(body).toMatchObject(absolution);
  });
});
