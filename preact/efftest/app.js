import 'https://cdn.skypack.dev/preact/debug';
import {h, render} from 'https://cdn.skypack.dev/preact';
import {useState, useEffect} from 'https://cdn.skypack.dev/preact/hooks'; //development version?
import htm from 'https://cdn.skypack.dev/htm';

const ht = htm.bind(h);


const App = props => {
  const [state, setState] = useState(0);
  useEffect(() => alert(foo.current.value), [state]);
  const foo = {current: null};
  return ht`
    ${state}
    <input ref=${foo}></>
    <button onclick=${() => setState(state + 1)}>asd</>
  `; 
}


render(ht`<${App} />`, document.getElementById('app'));
