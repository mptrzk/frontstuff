import 'https://cdn.skypack.dev/preact/debug';
import {render, h} from 'https://cdn.skypack.dev/preact';
import {useState, useReducer, useRef, useEffect} from 'https://cdn.skypack.dev/preact/hooks'; //braces?
import htm from 'https://cdn.skypack.dev/htm';

const ht = htm.bind(h);

const foo = props => {
  alert('foo called');
  return ht`<i onclick=${() => props.send('a')}>foo ${props.x}<//>`;
}

const bar = props => {
  alert('bar called');
  return ht`<i onclick=${() => props.send('b')}>bar ${props.x}<//>`;
}

const baz = props => {
  alert('baz called');
  return ht`<i onclick=${() => props.send('c')}>baz ${props.x}<//>`;
}

const si = {
  a: 1,
  b: 2,
  c: 3,
}

const update = (s, msg) => {
  const _s = {...s};
  if (msg == 'a') {
    _s.b++;
  }
  if (msg == 'b') {
    _s.c++;
  }
  if (msg == 'c') {
    _s.a++;
  }
  return _s;
}

const App = props => {
  const [s, send] = useReducer(update, si);
  return ht`
    <${foo} x=${s.a} send=${send}/>
    <br/>
    <${bar}/>
    <br/>
    <${baz} x=${s.c} send=${send}/>
    <br/>
  `;
}

render(ht`<${App}/>`, document.body);

/*
so diffing doesn't happen here
there's no other layer of diffing
the 'h' function doesn't check if props changed, right?
is key unnecessary for current component id?
  why?
    that small vdom impl doesn't seem to use it
  'parent:tag(n)' format
    passed to render
      or virtual-render or smth
*/
