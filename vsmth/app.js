import {init} from './vsmth.js'

function update(model, msg) {
  switch (msg) {
    case 'init':
      return 0;
    case 'inc':
      return model + 1;
    case 'dec':
      return model - 1;
    default:
      console.error(`invalid message - ${msg}`);
  }
}

function view(model, send) {
  const foo = Array(20).fill().map((x, i) => Array(20).fill().map((x, j) => i+j+model));
  return (
    ['span',
      ['div',
        ['input', {type: 'button', value: '-', onclick: () => send('dec')}],
        ['input', {value: model}],
        ['input', {type: 'button', value: '+', onclick: () => send('inc')}],
      ],
      ['div', {style:'overflow-x: scroll; white-space: nowrap; width: 200px'},
        `l${'o'.repeat(100)}ng text`
      ],
      (model % 2) ? 'odd' : ['b', 'even'],
      ['table',
        ...foo.map(row =>
          ['tr',
            ...row.map(col => ['td', col])
          ]
        ), 
      ],
      ['br'],
      ['div', ...Array(Math.abs(model)).fill(['i', `${model < 0 ? 'anti-' : ''}bottle `])],
      ['div', ...Array(5000).fill(['span', 'unchanging text '])],
    ]
  );
}

init(update, view, document.body);

