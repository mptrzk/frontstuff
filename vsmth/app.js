
import htm from 'https://cdn.skypack.dev/htm';

const h = (type, props, ...children) => {
  const el = document.createElement(type);
  //TODO sanitize props
  if (props) Object.entries(props).map(([k, v]) => {
    el.setAttribute(k, v);
    //TODO setting ref
  });
  const childNodes = children.map((c, i) => {
    if (typeof(c) === 'string') {
      el.appendChild(document.createTextNode(c));
    } else el.insertBefore(c, el.children[i + 1]); 
  });
  return el;
}

const ht = htm.bind(h);

/*
document.body.appendChild(
  h('h1', {style: 'color: green'},
    h('text', 'foo'))
);
*/

const render = (els, node) => {
  const elArr = Array.isArray(els) ? els : [els];
  node.replaceChildren(...elArr);
}

render(ht`
  <div>
    <h1 style='color:green'>
      foo
    </>
    <b>bar</>
    <u>baz</>
  </>
  <i>flobz</>
`, document.body);
