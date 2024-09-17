import * as request from 'supertest';
import { cleanupDb, populateDb } from 'test/utils/database';

describe('infrastructure/album/controllers/update.controller', () => {
  beforeEach(async () => {
    await populateDb();
  });

  afterEach(async () => {
    await cleanupDb();
  });

  it('Should succesfully update an album', async () => {
    const { body, status } = await request(process.env.API_URL)
      .put(`/albums/af402450-ca1a-4e41-ae34-c80b1a85c933`)
      .send({
        title: 'Showbiz',
      });

    expect(status).toBe(200);
    expect(body).toMatchObject({
      id: 'af402450-ca1a-4e41-ae34-c80b1a85c933',
      title: 'Showbiz',
    });
  });
});
