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
    z-index: 5 !important;
    background: blue !important;
    position: relative;
    top: -102px;
  }

`;

const zindexStyleNode = document.createElement('style');
zindexStyleNode.innerHTML = zindexStyle;
document.head.appendChild(zindexStyleNode);

const zindexMarkup = `
  z-index: higher
  <div class="wrapper">
    <div class="inline-block z-h"></div>
    <div class="inline-block z-d"></div>
  </div>

  z-index: lower
  <div class="wrapper">
    <div class="inline-block z-l"></div>
    <div class="inline-block z-d"></div>
  </div>

`;

// const defaultMarkup = `
//   default element
//   <div class="wrapper">
//     <div class="inline-block z-d"></div>
//   </div>
//
//   default element
//   <div class="wrapper">
//     <div class="inline-block z-d"></div>
//   </div>
// `;

const zindexWrapperNode = document.createElement('div');
zindexWrapperNode.innerHTML = zindexMarkup;
document.body.appendChild(zindexWrapperNode);
