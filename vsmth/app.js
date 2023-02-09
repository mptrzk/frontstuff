
let state = 0;
let vdom = undefined;

function inc() {
  state++;
  display();
}

function dec() {
  state--;
  display();
}

function propsCompare(a, b) {
  const ak = Object.keys(a);
  const bk = Object.keys(b);
  if (ak.length !== bk.length) return false;
  for (k of ak) {
    if (a[k] !== b[k]) return false;
  }
  return true;
}

function makeDom(vnode) {
  if (typeof(vnode) === 'object') { //TODO redundant condition?
    let el = document.createElement(vnode.type);
    Object.assign(el, vnode.props);
    return el;
  } else {
    return document.createTextNode(vnode);
  }
}

function diff(vnew, vold, root, idx) {
  let el = root.childNodes?.[idx];
  if (el === undefined) { //change to vold condition?
    el = makeDom(vnew);
    root.appendChild(el);  
  } else { //tru diffing down here
  }
  if (typeof(vnew) === 'object') {
    vnew.children.map((c, i) => diff(c, vold?.children?.[i], el, i));
  }
}
//handling different type and nonexistant elements with optional chaining?

function render(expr, root) {
  const vnew = Vnode(expr);
  diff(vnew, vdom, root, 0);
  vdom = vnew;
}

function Vnode(x) {
  if (Array.isArray(x)) {
    if (x[1].constructor.name === 'Object') {
      return {type: x[0], props: x[1], children: x.slice(2).map(Vnode)};
    }
    return {type: x[0], props: {}, children: x.slice(1).map(Vnode)};
  }
  return x;
}


function display() {
  const foo = Array(20).fill().map((x, i) => Array(20).fill().map((x, j) => i+j+state));
  const ret =  
    ['span',
      ['div',
        ['input', {type: 'button', value: '-', onclick: dec}],
        ['input', {value: state}],
        ['input', {type: 'button', value: '+', onclick: inc}],
      ],
      ['div', {style:'overflow-x: scroll; white-space: nowrap; width: 200px'},
        `l${'o'.repeat(100)}ng text`
      ],
      (state % 2) ? 'odd' : ['b', 'even'],
      ['table',
        ...foo.map(row =>
          ['tr',
            ...row.map(col => ['td', col])
          ]
        ), 
      ],
      ...Array(Math.abs(state)).fill(['i', `${state < 0 ? 'anti-' : ''}bottle `]),
    ];
  render(Vnode(ret), document.body);
}


document.body.replaceChildren();
display();

