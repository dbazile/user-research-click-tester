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
      name: 'click any green box1',
      instructions: `Yep, <strong>DO IT</strong>`,
      url: require('../test/fixtures/green-boxes.png')
    },
    {
      name: 'task 1',
      instructions: `Make it so, Mr Sulu...`,
      url: require('../test/fixtures/purple-boxes.png')
    }
  ]
});
// DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG

const target = document.createElement('div');
document.body.appendChild(target);
render(<Application/>, target);
