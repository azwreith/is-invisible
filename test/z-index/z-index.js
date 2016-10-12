const isInvisible = require('../../src/.');

describe('is-invisible - z-index', () => {
  it('should return `false` if the element has a higher z-index', () => {
    assert.isFalse(isInvisible(document.querySelector('.z-h')));
  });

  it('should return `true` if the element has a lower z-index', () => {
    assert.isTrue(isInvisible(document.querySelector('.z-l')));
  });
});
