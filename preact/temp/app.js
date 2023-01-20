import 'https://cdn.skypack.dev/preact/debug';
import {render, h} from 'https://cdn.skypack.dev/preact';
import {useState, useReducer, useRef, useEffect} from 'https://cdn.skypack.dev/preact/hooks'; //braces?
import htm from 'https://cdn.skypack.dev/htm';

const ht = htm.bind(h);


const scales = [
  {
    name: 'K',
    to: t => t,
    from: t => t,
  },
  {
    name: '°C',
    to: t => t - 273.15,
    from: t => t + 273.15,
  },
  {
    name: '°F',
    to: t => (t - 273.15)*9/5 + 32,
    from: t => (t - 32)*5/9 + 273.15,
  },
  {
    name: '°R',
    to: t => 9/5 * t,
    from: t => 5/9 * t,
  },
];

const Temp = props => {
  const input = useRef(null); //why ref hook returns an object with single property?
  const {name, to, from} = props.scale;
  const t = props.t;
  const val = props.selected === name ? input.current?.value : to(t); 
  const inpf = e => {
    if (props.selected === name) {
      props.send(['t', from(parseFloat(e.target.value))])
    }
  }
  const sf = () => {
    if (props.selected !== name) props.send(['selected', name]);
  }
  return ht`
  <div class='temp'>
    ${`${name}: `}
    <br/>
    <input ref=${input} type='text' value=${val} onfocus=${sf} oninput=${inpf}><//>
  <//>
  `;///^^^ded
}
//will I unlearn stuff by  rewriting?
//bugriddnen switching to reducer

const init = () => {
  return {
    t: 0, //fookin semicolons
    selected: null,
  };
}

//superfluous passing
//why not just pass variables
//  they ain't reactive
//  a reducer might calculate something as well
const update = (s, msg) => {
  const [type, val] = msg; //silent bugs were here
  const _s = {...s};
  if (type == 't') {
    _s.t = val; //and here
  }
  if (type == 'selected') {
    _s.selected = val;
  }
  return _s;
}

//reducer in the beginning, because it quickly becomes clunky
const App = props => {
  const [state, send] = useReducer(update, init());
  //factor out needed state and pass it as prop to avoid prop bloat?
  return scales.map(scale => ht`
    <${Temp} scale=${scale} send=${send} t=${state.t} selected=${state.selected}/>
  `);
}

render(ht`<${App}/>`, document.body);


//is infinite loop with onfocused event caused by 'alert'?

//do hooks get resolved by abusing the commit queue?
//how hooks know what calls them
//are they function-bound?
//i just want stuff to re-render when it changes
//do components get identified by the key passed to them?
//
//does it get re-render when state changes but the given prop doesn'to?
//
//is re-rendering supertree cheaper?
//
//arrays as Map keys
//  they have to be immutable arrays
//explicit update
//
//does reducer 'dispatch' dispatch an event?
//is elm faster than preact?
//"optimizing elm only touches view code"
//the reducer check
