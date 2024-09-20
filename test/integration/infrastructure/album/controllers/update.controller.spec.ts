import { SaveAlbumUsecase } from 'src/application/album/save.usecase';
import { AlbumEntity } from 'src/infrastructure/album/album.entity';
import { AlbumRepository } from 'src/infrastructure/album/album.repository';
import { UpdateAlbumController } from 'src/infrastructure/album/controllers/update.controller';
import * as request from 'supertest';
import { absolution } from 'test/mocks/album';

describe('infrastructure/album/controllers/update.controller', () => {
  beforeAll(async () => {
    await global.setAppModule(
      AlbumEntity,
      SaveAlbumUsecase,
      AlbumRepository,
      'AlbumRepositoryInterface',
      UpdateAlbumController,
    );
  });

  it('should update a specific album according to its id', async () => {
    const { body, status } = await request(global.app.getHttpServer())
      .put(`/albums/${absolution.id}`)
      .send({
        title: 'Showbiz',
      });

    expect(status).toBe(200);
    expect(body).toMatchObject({
      id: absolution.id,
      title: 'Showbiz',
    });
  });
});
