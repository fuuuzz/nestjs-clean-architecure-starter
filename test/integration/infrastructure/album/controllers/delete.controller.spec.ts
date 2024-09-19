import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { DeleteAlbumUsecase } from 'src/application/album/delete.usecase';
import { DeleteAlbumController } from 'src/infrastructure/album/controllers/delete.controller';
import * as request from 'supertest';
import { mockAlbumRepository, absolution } from 'test/mocks/album';

describe('infrastructure/album/controllers/delete.controller', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const appModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        DeleteAlbumUsecase,
        { provide: 'AlbumRepositoryInterface', useValue: mockAlbumRepository },
      ],
      controllers: [DeleteAlbumController],
    }).compile();

    app = appModule.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should delete a specific album according to its id', async () => {
    const { body, status } = await request(app.getHttpServer()).delete(
      `/albums/${absolution.id}`,
    );

    expect(status).toBe(200);
    expect(body).toMatchObject({ title: absolution.title });
  });

  it('should fail when album does not exist', async () => {
    jest.spyOn(mockAlbumRepository, 'findOneById').mockResolvedValue(null);

    const { body, status } = await request(app.getHttpServer()).delete(
      `/albums/${absolution.id}`,
    );

    expect(status).toBe(404);
    expect(body).toMatchObject({ message: 'Not Found', statusCode: 404 });
  });
});
