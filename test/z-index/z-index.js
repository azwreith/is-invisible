const isInvisible = require('../../src/.');

describe('is-invisible - basic', () => {
  it('should return `false` if the element has higher z-index', () => {
    assert.isFalse(isInvisible(document.querySelector('.z-h')));
  });

  it('should return `true` if the element has lower z-index', () => {
    assert.isTrue(isInvisible(document.querySelector('.z-l')));
  });
});
