
import htm from 'https://cdn.skypack.dev/htm';


const h = (type, props, ...children) => {
  return {type:type, props:{...props, children: children}};
}

const ht = htm.bind(h);

/*
document.body.appendChild(
  h('h1', {style: 'color: green'},
    h('text', 'foo'))
);

const diff = (vnode, dom) => {
  if (Array.isArray(vnode)) {
    dom.replaceChildren(...vnode.map(diff, dom)); 
  }
}
*/

const render = (vnode, dom) => {
  dom.innerHTML = JSON.stringify(vnode);
}


render(ht`
  <div>
    <h1 style='color:green'>
      ${ht`foo`}
    </>
    <b>bar</>
    <u>baz</>
  </>
  <i>flobz</>
`, document.body);
