import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { GetAllAlbumUsecase } from 'src/application/album/getAll.usecase';
import { GetAllAlbumController } from 'src/infrastructure/album/controllers/getAll.controller';
import * as request from 'supertest';
import {
  mockAlbumRepository,
  absolution,
  originOfSymmetry,
} from 'test/mocks/album';

describe('infrastructure/album/controllers/getAll.controller', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const appModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        GetAllAlbumUsecase,
        { provide: 'AlbumRepositoryInterface', useValue: mockAlbumRepository },
      ],
      controllers: [GetAllAlbumController],
    }).compile();

    app = appModule.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should fetch all albums', async () => {
    const { body, status } = await request(app.getHttpServer()).get(`/albums`);

    expect(status).toBe(200);
    expect(body).toMatchObject([absolution, originOfSymmetry]);
  });
});
