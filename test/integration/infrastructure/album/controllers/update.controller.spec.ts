import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { SaveAlbumUsecase } from 'src/application/album/save.usecase';
import { UpdateAlbumController } from 'src/infrastructure/album/controllers/update.controller';
import * as request from 'supertest';
import { mockAlbumRepository, absolution } from 'test/mocks/album';

describe('infrastructure/album/controllers/update.controller', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const appModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        SaveAlbumUsecase,
        { provide: 'AlbumRepositoryInterface', useValue: mockAlbumRepository },
      ],
      controllers: [UpdateAlbumController],
    }).compile();

    app = appModule.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should update a specific album according to its id', async () => {
    const { body, status } = await request(app.getHttpServer()).put(
      `/albums/${absolution.id}`,
    );

    expect(status).toBe(200);
    expect(body).toMatchObject(absolution);
  });
});
