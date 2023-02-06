
let state = 0;

function inc() {
  state++;
  render();
}

function dec() {
  state--;
  render();
}

function wrap(tag, x) {
  return `<${tag}>${x}</${tag}>`;
}
function arrwrap(tag, arr) {
  return arr.map(x => wrap(tag, x)).join('');
}

function render() {
  const foo = Array(17).fill().map((x, i) => Array(17).fill().map((x, j) => i+j+state))
  document.body.innerHTML = `
      <div>
        <input type='button' value='+' onclick='inc()'/>
        <input value='${state}' />
        <input type='button' value='-' onclick='dec()'/>
      </div>
      <table>
        ${arrwrap('tr', foo.map(x => arrwrap('td', x)))}
      </table>
  `;
}

render();

//wydyaneed message passing
