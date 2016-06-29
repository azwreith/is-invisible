const isInvisible = require('../src/.');

describe('is-invisible', () => {
  const markup = `
    <div style="display:none"></div>
    <div style="visibility:hidden"></div>
    <div style="opacity:0"></div>

    <div style="height:0;overflow:hidden">
      <div></div>
    </div>
    <div style="width:0;overflow:hidden">
      <div></div>
    </div>

    <div style="opacity:.5"></div>
    <div></div>
    `;
  const wrapper = document.createElement('div');
  wrapper.innerHTML = markup;
  document.body.appendChild(wrapper);

  it('should return `true` for an non existent element', () => {
    assert.isTrue(
      isInvisible(
        document.createElement('div')
      )
    );
  });

  it('should return `true` for invisible element - [style="display:none"]', () => {
    assert.isTrue(
      isInvisible(
        document.querySelector('[style="display:none"]')
      )
    );
  });

  it('should return `true` for invisible element - [style="visibility:hidden"]', () => {
    assert.isTrue(
      isInvisible(
        document.querySelector('[style="visibility:hidden"]')
      )
    );
  });

  it('should return `true` for invisible element - [style="opacity:0"]', () => {
    assert.isTrue(
      isInvisible(
        document.querySelector('[style="opacity:0"]')
      )
    );
  });

  it('should return `true` for invisible element - [style="height:0;overflow:hidden"] > div', () => {
    assert.isTrue(
      isInvisible(
        document.querySelector('[style="height:0;overflow:hidden"] > div')
      )
    );
  });

  it('should return `true` for invisible element - [style="width:0;overflow:hidden"] > div', () => {
    assert.isTrue(
      isInvisible(
        document.querySelector('[style="width:0;overflow:hidden"] > div')
      )
    );
  });

  it('should return `false` for visible element - [style="opacity:.5"]', () => {
    assert.isFalse(
      isInvisible(
        document.querySelector('[style="opacity:.5"]')
      )
    );
  });

  it('should return `false` for visible element - :not([style])', () => {
    assert.isFalse(
      isInvisible(
        document.querySelector(':not([style])')
      )
    );
  });
});
