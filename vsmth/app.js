import {init} from './vsmth.js'

function update(model, msg) {
  const [type, value] = msg;
  switch (type) {
    case 'init':
      return {
        count: 0,
        wasTyped: false,
      }
    case 'inc':
      model.count++;
      model.wasTyped = false;
      return model;
    case 'dec':
      model.count--;
      model.wasTyped = false;
      return model;
    case 'set':
      model.count = value;
      model.wasTyped = true;
      return model;
    default:
      console.error(`invalid message - ${msg}`);
  }
}

function view(model, send) {
  const foo = Array(20).fill().map((x, i) => Array(20).fill().map((x, j) => i+j+model.count));
  const ref = {};
  function processInput() {
    const val = parseInt(ref.current.value);
    if (val === undefined || isNaN(val)) return;
    send(['set', parseInt(val)]);
  };
  return (
    ['span',
      ['div',
        ['input', {type: 'button', value: '-', onclick: () => send(['dec'])}],
        ['input', {value: model.count, ref: ref, oninput: processInput}],
        ['input', {type: 'button', value: '+', onclick: () => send(['inc'])}],
        ['input', {type: 'button', value: 'log ref', onclick: () => console.log(ref)}],
      ],
      ['div', {style:'overflow-x: scroll; white-space: nowrap; width: 200px'},
        `l${'o'.repeat(100)}ng text`
      ],
      (model.count % 2) ? 'odd' : ['b', 'even'],
      ['table',
        ...foo.map(row =>
          ['tr',
            ...row.map(col => ['td', col])
          ]
        ), 
      ],
      ['br'],
      ['div', ...Array(Math.abs(model.count)).fill(['i', `${model.count < 0 ? 'anti-' : ''}bottle `])],
      ['div', ...Array(5000).fill(['span', 'unchanging text '])],
    ]
  );
}

init(update, view, document.body);

