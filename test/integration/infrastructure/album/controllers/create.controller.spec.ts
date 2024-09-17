import * as request from 'supertest';

describe('infrastructure/album/controllers/create.controller', () => {
  it('Should succesfully create an album', async () => {
    const { body, status } = await request(process.env.API_URL)
      .post('/albums')
      .send({
        title: 'Absolution',
      });

    expect(status).toBe(201);
    expect(body).toMatchObject({
      id: expect.any(String),
      title: 'Absolution',
    });
  });
});
