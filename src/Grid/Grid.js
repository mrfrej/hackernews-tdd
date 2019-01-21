import React, { Component } from 'react';
import './grid.css';

class Grid extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);

    }

    onClick(event) {
        let id = Number(event.target.value);
        console.log(id);
        this.props.selectStory(id);
    }

    render() {

        const stories = this.props.stories;

        return stories.map((story, index) => {
            if (story.selected) {
                return (
                    <button key={story.id} id={story.id} className="card selected" onClick={this.onClick} value={story.id}>
                        <div className="points">&#9650; {story.score} points</div>
                        <div className="card-header">{story.title}</div>
                        <div className='author'>{story.by}</div>
                        <div className="text-selected">{story.text}</div>
                    </button>)
            }
            else {
                return (
                    <button key={story.id} id={story.id} className="card not-selected" onClick={this.onClick}
                       value={story.id}>
                        <div className="points">&#9650; {story.score} points</div>
                        <div className="card-header">{story.title}</div>
                        <div className='author'>{story.by}</div>
                        <div className='text'>{story.text}</div>
                    </button>
                )
            }
        })
    }
}

export default Grid