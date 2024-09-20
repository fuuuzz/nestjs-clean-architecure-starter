import { GetAlbumUsecase } from 'src/application/album/get.usecase';
import { AlbumEntity } from 'src/infrastructure/album/album.entity';
import { AlbumRepository } from 'src/infrastructure/album/album.repository';
import { GetAlbumController } from 'src/infrastructure/album/controllers/get.controller';
import * as request from 'supertest';
import { absolution } from 'test/mocks/album';

describe('infrastructure/album/controllers/get.controller', () => {
  beforeAll(async () => {
    await global.setAppModule(
      AlbumEntity,
      GetAlbumUsecase,
      AlbumRepository,
      'AlbumRepositoryInterface',
      GetAlbumController,
    );
  });

  it('should fetch a specific albums according to its id', async () => {
    const { body, status } = await request(global.app.getHttpServer()).get(
      `/albums/${absolution.id}`,
    );

    expect(status).toBe(200);
    expect(body).toMatchObject(absolution);
  });

  it('should fail when album does not exist', async () => {
    const { body, status } = await request(global.app.getHttpServer()).get(
      `/albums/c36c0f63-2aa8-49c5-a127-3125c63b1e4d`,
    );

    expect(status).toBe(404);
    expect(body).toMatchObject({ message: 'Not Found', statusCode: 404 });
  });
});
