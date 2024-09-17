import * as request from 'supertest';
import { cleanupDb, populateDb } from 'test/utils/database';

describe('infrastructure/album/controllers/get.controller', () => {
  beforeEach(async () => {
    await populateDb();
  });

  afterEach(async () => {
    await cleanupDb();
  });

  it('Should succesfully get an album', async () => {
    const { body, status } = await request(process.env.API_URL).get(
      `/albums/ed6ef473-5fb3-4060-b4ae-18a3f9c7e393`,
    );
    expect(status).toBe(200);
    expect(body).toMatchObject({
      id: 'ed6ef473-5fb3-4060-b4ae-18a3f9c7e393',
      title: 'Origin of symmetry',
    });
  });
});
