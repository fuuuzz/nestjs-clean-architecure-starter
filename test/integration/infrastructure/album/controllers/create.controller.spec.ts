import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { SaveAlbumUsecase } from 'src/application/album/save.usecase';
import { CreateAlbumController } from 'src/infrastructure/album/controllers/create.controller';
import * as request from 'supertest';
import { mockAlbumRepository, absolution } from 'test/mocks/album';

describe('infrastructure/album/controllers/create.controller', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const appModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        SaveAlbumUsecase,
        { provide: 'AlbumRepositoryInterface', useValue: mockAlbumRepository },
      ],
      controllers: [CreateAlbumController],
    }).compile();

    app = appModule.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create an album', async () => {
    const { body, status } = await request(app.getHttpServer())
      .post(`/albums/`)
      .send(absolution);

    expect(status).toBe(201);
    expect(body).toMatchObject(absolution);
  });
});
