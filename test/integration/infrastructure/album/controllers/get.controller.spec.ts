import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { GetAlbumUsecase } from 'src/application/album/get.usecase';
import { GetAlbumController } from 'src/infrastructure/album/controllers/get.controller';
import * as request from 'supertest';
import { mockAlbumRepository, absolution } from 'test/mocks/album';

describe('infrastructure/album/controllers/get.controller', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const appModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        GetAlbumUsecase,
        { provide: 'AlbumRepositoryInterface', useValue: mockAlbumRepository },
      ],
      controllers: [GetAlbumController],
    }).compile();

    app = appModule.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should fetch a specific albums according to its id', async () => {
    const { body, status } = await request(app.getHttpServer()).get(
      `/albums/${absolution.id}`,
    );

    expect(status).toBe(200);
    expect(body).toMatchObject(absolution);
  });

  it('should fail when album does not exist', async () => {
    jest.spyOn(mockAlbumRepository, 'findOneById').mockResolvedValue(null);

    const { body, status } = await request(app.getHttpServer()).get(
      `/albums/${absolution.id}`,
    );

    expect(status).toBe(404);
    expect(body).toMatchObject({ message: 'Not Found', statusCode: 404 });
  });
});
