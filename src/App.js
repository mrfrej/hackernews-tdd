import React, { Component } from 'react';
import './index.css';
import Grid from './Grid/Grid.js'
import he from 'he'


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stories: []
        }
        this.selectStory = this.selectStory.bind(this);
    }

    componentDidMount() {
        this.fetchStories(0,24).then((stories) => {
            this.setState({
                stories
            })
        })
    }

    /*
    * Untested
    * */
    async fetchStories(fromStory, toStory) {

        let storyIds = await fetch(`https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty`).then(response => response.json()).then((response) => {
            return response;
        })

        storyIds = storyIds.slice(fromStory, toStory);

        let storyPromises = storyIds.map(async (storyId) => {
            return fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`).then((response) => response.json())
        })

        return Promise.all(storyPromises).then((response)=> {
            let stories = response.map((story) => {
                story.selected = false;
                story.text = he.decode(String(story.text));
                story.title = he.decode(String(story.title));
                return story
            })
            return stories;
        });
    }

    selectStory(id) {
        let stories = this.state.stories;
        stories.map((story) => {
            story = story.id === id ? story.selected = !story.selected : story.selected;
            return story
        })

        this.setState({
            stories: stories
        })
    }

    render() {

        const stories = this.state.stories;

        return (
            <div>
                <div className="container">
                    <div className="wrapper">
                        <Grid stories={stories} selectStory={this.selectStory}/>
                    </div>
                </div>
            </div>
        );
    }

}
export default App;