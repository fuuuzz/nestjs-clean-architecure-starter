import * as request from 'supertest';
import { cleanupDb, populateDb } from 'test/utils/database';

describe('infrastructure/album/controllers/getAll.controller', () => {
  beforeAll(async () => {
    await cleanupDb();
  });

  beforeEach(async () => {
    await populateDb();
  });

  afterEach(async () => {
    await cleanupDb();
  });

  it('Should succesfully get all albums', async () => {
    const { body, status } = await request(process.env.API_URL).get(`/albums`);

    expect(status).toBe(200);
    expect(body).toMatchObject([
      {
        id: 'af402450-ca1a-4e41-ae34-c80b1a85c933',
        title: 'Absolution',
      },
      {
        id: 'ed6ef473-5fb3-4060-b4ae-18a3f9c7e393',
        title: 'Origin of symmetry',
      },
    ]);
  });
});
