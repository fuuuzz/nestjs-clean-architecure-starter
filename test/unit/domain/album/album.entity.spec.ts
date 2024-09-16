import { Album } from 'src/domain/album/album.entity';

describe('domain/album', () => {
  const album = new Album('Absolution', new Date('2003-09-15'));

  it('getters', () => {
    expect(album.id).toBeUndefined();
    expect(album.title).toBe('Absolution');
    expect(album.releaseDate.getTime()).toBe(new Date('2003-09-15').getTime());
  });

  it('setters', () => {
    album.title = 'Origin of symmetry';
    album.releaseDate = new Date('2001-06-18');

    expect(album.title).toBe('Origin of symmetry');
    expect(album.releaseDate.getTime()).toBe(new Date('2001-06-18').getTime());
  });
});
