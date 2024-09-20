import { DeleteAlbumUsecase } from 'src/application/album/delete.usecase';
import { AlbumEntity } from 'src/infrastructure/album/album.entity';
import { AlbumRepository } from 'src/infrastructure/album/album.repository';
import { DeleteAlbumController } from 'src/infrastructure/album/controllers/delete.controller';
import * as request from 'supertest';
import { mockAlbumRepository, absolution } from 'test/mocks/album';

describe('infrastructure/album/controllers/delete.controller', () => {
  beforeAll(async () => {
    await global.setAppModule(
      AlbumEntity,
      DeleteAlbumUsecase,
      AlbumRepository,
      'AlbumRepositoryInterface',
      DeleteAlbumController,
    );
  });

  it('should delete a specific album according to its id', async () => {
    const { body, status } = await request(global.app.getHttpServer()).delete(
      `/albums/${absolution.id}`,
    );

    expect(status).toBe(200);
    expect(body).toMatchObject({ title: absolution.title });
  });

  it('should fail when album does not exist', async () => {
    jest.spyOn(mockAlbumRepository, 'findOneById').mockResolvedValue(null);

    const { body, status } = await request(global.app.getHttpServer()).delete(
      `/albums/${absolution.id}`,
    );

    expect(status).toBe(404);
    expect(body).toMatchObject({ message: 'Not Found', statusCode: 404 });
  });
});
