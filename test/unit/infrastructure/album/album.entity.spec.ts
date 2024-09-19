import { absolution } from 'test/mocks/album';

describe('infrastructure/album/album.entity', () => {
  it('getters', () => {
    expect(absolution.id).toBe('af402450-ca1a-4e41-ae34-c80b1a85c933');
    expect(absolution.title).toBe('Absolution');
  });

  it('setters', () => {
    absolution.title = 'Origin of symmetry';

    expect(absolution.title).toBe('Origin of symmetry');
  });
});
