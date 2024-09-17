import { AlbumEntity } from 'src/infrastructure/album/album.entity';

describe('infrastructure/album/album.entity', () => {
  const album = new AlbumEntity('Absolution');

  it('getters', () => {
    expect(album.id).toBeUndefined();
    expect(album.title).toBe('Absolution');
  });

  it('setters', () => {
    album.title = 'Origin of symmetry';

    expect(album.title).toBe('Origin of symmetry');
  });
});
