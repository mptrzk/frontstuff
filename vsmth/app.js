
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

function propsEqual(a, b) {
  const ak = Object.keys(a);
  const bk = Object.keys(b);
  if (ak.length !== bk.length) return false;
  for (k of ak) {
    if (a[k] !== b[k]) return false;
  }
  return true;
}

function makeDom(vnode) { //TODO split to make-tag and make-text?
  if (typeof(vnode) === 'object') { //TODO redundant condition?
    let el = document.createElement(vnode.type);
    Object.assign(el, vnode.props);
    return el;
  } else {
    return document.createTextNode(vnode);
  }
}


function diff(vnew, vold, root, idx, rootChanged) {
  let el = root.childNodes?.[idx]; //move down to non-null cases?
  let elChanged = false;
  if (typeof(vnew) === 'object') {
    if (el === undefined) {//none with tag // //change to vold condition?
      el = makeDom(vnew);
      elChanged = true; //pro forma? remove?
      root.appendChild(el); //change to index-aware?
    } else {
      if (typeof(vold) === 'object') { //tag with tag
        if (vnew.type !== vold.type) el.replaceWith(makeDom(vnew));
        elChanged = true;
        if (!propsEqual(vnew.props, vold.props)) Object.assign(el, vnew.props); //redundant sometimes?
      } else { //text with tag
        el.replaceWith(makeDom(vnew)) //TODO understand the thrown exception before doing that root change stuff
      }
    }
    vnew.children.map((c, i) => diff(c, vold?.children?.[i], el, i, elChanged));
    //kill orphans here
  } else {
    if (el === undefined) {//none with text // //change to vold condition?
      el = makeDom(vnew);
      root.appendChild(el);
    } else {
      if (typeof(vold) === 'object') { //tag with text
        el.replaceWith(makeDom(vnew));
      } else { //text with text
        if (vnew !== vold) el.data = vnew;
      }
    }
  }
}
//TODO vnode eq to make things faster when stuff doesn't change
//  yeah, but it would require expression memoization or something
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

