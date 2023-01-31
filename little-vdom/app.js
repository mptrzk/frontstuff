import Htm from 'https://cdn.skypack.dev/htm';
import {render, h, Fragment} from './little-vdom.js';

const ht = Htm.bind(h);

render(ht`
  <${Fragment}>
    hello
    <div>
      foo
      ${1}
      ${true}
      ${[1, ht`<b>2</>`, 3]}
    </>
    <i>and that's it</>
  </>
`, document.body);

