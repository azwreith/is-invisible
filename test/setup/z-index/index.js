const zindexStyle = `

  .z-h {
    z-index: 999 !important;
    position: relative;
    background: red !important;
  }

  .z-l {
    z-index: 1 !important;
    position: relative;
    background: red !important;
  }

  .z-d {
    top: 0px;
    left: 0px;
    width: 300px;
    height: 300px;
    position: fixed;
    z-index: 5 !important;
    background: blue !important;
  }

`;

const zindexStyleNode = document.createElement('style');
zindexStyleNode.innerHTML = zindexStyle;
document.head.appendChild(zindexStyleNode);

const zindexMarkup = `
  z-index: higher
  <div class="wrapper">
    <div class="inline-block z-h"></div>
  </div>

  z-index: lower
  <div class="wrapper">
    <div class="inline-block z-l"></div>
  </div>

  <div class="z-d"></div>

`;

const zindexWrapperNode = document.createElement('div');
zindexWrapperNode.innerHTML = zindexMarkup;
document.body.appendChild(zindexWrapperNode);
