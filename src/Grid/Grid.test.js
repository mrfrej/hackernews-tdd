import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import Grid from './Grid.js'
import App from '../App.js'
import {stories} from '../mockData'

it('renders without crashing', () => {
    shallow(<Grid stories={stories}/>);
});

it('renders 3 unselected cards when props contains 3 unselected stories with correct classes', () => {
    const selectStory = jest.fn();
    const wrapper = mount(<Grid stories={stories} selectStory={selectStory} />);
    expect(wrapper).toContainMatchingElements(3,'.not-selected');
    expect(wrapper).toContainMatchingElements(3,'.card');
    expect(wrapper).toContainMatchingElements(3,'.card-header');
    expect(wrapper).toContainMatchingElements(3,'.author');
    expect(wrapper).toContainMatchingElements(3,'.text');
});

it('renders 3 selected cards when props contains 3 selected stories with correct classes', () => {
    const selectStory = jest.fn();
    var selectedStories = stories.map((story) => {
        story.selected = true;
        return story
    });
    const wrapper = mount(<Grid stories={selectedStories} selectStory={selectStory} />);
    expect(wrapper).toContainMatchingElements(3,'.selected');
    expect(wrapper).toContainMatchingElements(3,'.card');
    expect(wrapper).toContainMatchingElements(3,'.card-header');
    expect(wrapper).toContainMatchingElements(3,'.author');
    expect(wrapper).toContainMatchingElements(3,'.text-selected');
});

it('renders 1 unselected card with the right classes and values', () => {
    const selectStory = jest.fn();
    let selectedStoryArr = stories.slice(0,1);
    let selectedStory = stories.slice(0,1)[0];
    selectedStory.selected = false;
    const wrapper = mount(<Grid stories={selectedStoryArr} selectStory={selectStory} />);
    expect(wrapper.find('.points')).toIncludeText('' +selectedStory.score);
    expect(wrapper.find('.card-header')).toIncludeText(selectedStory.title);
    expect(wrapper.find('.author')).toIncludeText(selectedStory.by);
    expect(wrapper.find('.text')).toIncludeText(selectedStory.text);
});

it('renders 1 selected card with the right classes and values', () => {
    const selectStory = jest.fn();
    let selectedStoryArr = stories.slice(0,1);
    let selectedStory = stories.slice(0,1)[0];
        selectedStory.selected = true;
    const wrapper = mount(<Grid stories={selectedStoryArr} selectStory={selectStory} />);
    expect(wrapper.find('.points')).toIncludeText('' +selectedStory.score);
    expect(wrapper.find('.card-header')).toIncludeText(selectedStory.title);
    expect(wrapper.find('.author')).toIncludeText(selectedStory.by);
    expect(wrapper.find('.text-selected')).toIncludeText(selectedStory.text);
});


it('it calls parent function selectStory when user clicks on a card', () => {
    const selectStory = jest.fn();
    const mockedEvent = { target: {value:886313}};
    const wrapper = mount(<Grid stories={stories} selectStory={selectStory} />);
    wrapper.find('[id=886313]').simulate('click', mockedEvent);
    expect(selectStory).toHaveBeenCalled();
});