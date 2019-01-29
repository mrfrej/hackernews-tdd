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

    renderCards(stories) {
        return stories.map((story, index) => {
                return (
                    <button key={story.id} id={story.id} className={`card ${story.selected ? 'selected':'not-selected'}`} onClick={this.onClick} value={story.id}>
                        <div className="points">&#9650; {story.score} points</div>
                        <div className="card-header">{story.title}</div>
                        <div className='author'>{story.by}</div>
                        <div className={`${story.selected ? 'text-selected':'text'}`}>{story.text}</div>
                    </button>)
            })
    }

    render() {
        const stories = this.props.stories;

        return(<div className="wrapper">
            {this.renderCards(stories)}
        </div>)
    }
}

export default Grid