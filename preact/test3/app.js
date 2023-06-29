import {createElement, useState} from 'https://cdn.skypack.dev/react';
import {render} from 'https://cdn.skypack.dev/react-dom';
import htm from 'https://cdn.skypack.dev/htm';

const ht = htm.bind(createElement);


const SampleText = props => {
  console.log('Rendering sample text');
  return ht`<div><i> sample text </></>`;
}

const App = props => {
  const [state, setState] = useState(0);
  return ht`
    <h1>Hello ${state}</>
    <button onClick=${() => setState(state + 1)}>increment</>
    <${SampleText}/>
  `; //whyyyy
}


render(ht`<${App} />`, document.getElementById('app'));
