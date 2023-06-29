import 'https://cdn.skypack.dev/preact/debug';
import {h, render} from 'https://cdn.skypack.dev/preact';
import {useReducer} from 'https://cdn.skypack.dev/preact/hooks'; //development version?
import htm from 'https://cdn.skypack.dev/htm';

const ht = htm.bind(h);


const init = () => {
  console.log('init called');
  return 0;
}


const update = (state, msg) => {
  const [action , data] = msg;
  switch (action) {
    case 'inc':
      return state + 1;
  }
}


const App = props => {
  const [state, send] = useReducer(update, null, init);
  //const [state, send] = useReducer(update, init); //maybe that's what breaks it
  return ht`
    <h1>Hello ${state} </>
    <br />
    <button onclick=${() => send(['inc', 1])}>+</>
  `;
}


render(ht`<${App} />`, document.body);
