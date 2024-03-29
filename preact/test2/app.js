import 'https://cdn.skypack.dev/preact/debug';
import {h, render} from 'https://cdn.skypack.dev/preact';
import {useState} from 'https://cdn.skypack.dev/preact/hooks'; //development version?
import htm from 'https://cdn.skypack.dev/htm';

const ht = htm.bind(h);


const SampleText = props => {
  console.log('Rendering sample text');
  return ht`<div><i> sample text </></>`;
}

const App = props => {
  const [state, setState] = useState(0);
  return ht`
    <h1>Hello ${state}</>
    <button onclick=${() => setState(state + 1)}>increment</>
    <${SampleText}/>
  `; //whyyyy
}


render(ht`<${App} />`, document.getElementById('app'));
