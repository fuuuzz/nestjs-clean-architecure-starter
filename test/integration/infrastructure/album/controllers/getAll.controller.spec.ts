import { GetAllAlbumUsecase } from 'src/application/album/getAll.usecase';
import { AlbumEntity } from 'src/infrastructure/album/album.entity';
import { AlbumRepository } from 'src/infrastructure/album/album.repository';
import { GetAllAlbumController } from 'src/infrastructure/album/controllers/getAll.controller';
import * as request from 'supertest';
import { absolution, originOfSymmetry } from 'test/mocks/album';

describe('infrastructure/album/controllers/getAll.controller', () => {
  beforeAll(async () => {
    await global.setAppModule(
      AlbumEntity,
      GetAllAlbumUsecase,
      AlbumRepository,
      'AlbumRepositoryInterface',
      GetAllAlbumController,
    );
  });

  it('should fetch all albums', async () => {
    const { body, status } = await request(global.app.getHttpServer()).get(
      `/albums`,
    );

    expect(status).toBe(200);
    expect(body).toMatchObject([absolution, originOfSymmetry]);
  });
});
