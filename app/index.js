import './styles/index.css';

import React from 'react';
import {render} from 'react-dom';
import Application from './components/Application';

// DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG
// Seed store
import {serialize} from './store';
serialize({
  tasks: [
    {
      id: 'alpha',
      name: 'Click any one of the purple boxes',
      instructions: 'Demonstration of landscape orientation',
      url: require('../test/fixtures/desktop.png')
    },
    {
      id: 'bravo',
      name: 'Again, click anywhere you want',
      instructions: 'Demo of portrait orientation',
      url: require('../test/fixtures/purple-boxes.png')
    },
    {
      id: 'charlie',
      name: 'Green Boxes',
      instructions: 'Demo of portrait orientation',
      url: require('../test/fixtures/green-boxes.png')
    }
  ]
});
// DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG

const target = document.createElement('div');
document.body.appendChild(target);
render(<Application/>, target);
