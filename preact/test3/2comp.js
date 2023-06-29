import 'https://cdn.skypack.dev/preact/debug';
import {h, render} from 'https://cdn.skypack.dev/preact';
import {useReducer} from 'https://cdn.skypack.dev/preact/hooks'; //development version?
import htm from 'https://cdn.skypack.dev/htm';

const ht = htm.bind(h);


const init = () => {
  console.log('init called');
  return {'x': 0, 'y': 0};
}


const update = (state, msg) => {
  const [action , data] = msg;
  switch (action) {
    case 'inc':
      const _state = {...state};
      _state[data] += 1;
      return _state;
  }
}

const Field = props => {
  console.log(`Field "${props.field}" rendered`);
  return ht`<span>${props.field}${props.value}</>`;
}

//<h1>Hello {${Object.entries(state).map(([field, value]) => ht`<${Field} field=${field} value=${value} />, `)}} </>

const App = props => {
  const [state, send] = useReducer(update, null, init);
  //const [state, send] = useReducer(update, init); //maybe that's what breaks it
  return ht`
    <h1>Hello <${Field} field='x' value=${state['x']} /><${Field} field='y' value=${state['y']} /></>
    <br />
    <button onclick=${() => send(['inc', 'x'])}>X+</>
    <button onclick=${() => send(['inc', 'y'])}>Y+</>
  `;
}


render(ht`<${App} />`, document.body);
