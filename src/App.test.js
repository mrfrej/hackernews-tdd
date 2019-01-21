import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Grid from './Grid/Grid.js';
import { shallow, mount } from 'enzyme';
import {stories} from './mockData'

it('renders without crashing', () => {
  shallow(<App />);
});

it('renders one grid component', async () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toContainExactlyOneMatchingElement('Grid');
});

it('renders 3 unselected cards when state contains 3 unselected stories', async () => {
  const wrapper = mount(<App />);
  wrapper.setState({stories});
  expect(wrapper).toContainMatchingElements(3,'.not-selected');
});

it('sets a story to selected when the selectStory method is called', async () => {
  const wrapper = mount(<App />);
  wrapper.setState({stories});
  wrapper.instance().selectStory(886313);
  wrapper.update();
  expect(wrapper).toContainExactlyOneMatchingElement('.selected');
});