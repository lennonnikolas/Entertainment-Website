import React, { Component } from 'react';
import Intro from '../../components/Intro';
import Loader from '../../components/Loader';

class Games extends Component {

    state = {
        games: [],
        gameText: ''
    }

    handleInputChange = e => {
        this.setState({ gameText: e.target.value })
    }

    handleInputEmpty = (gameText) => {
        if (gameText === '') {
            return <div>
                <p>Please enter a game title to search</p>
            </div>
        } else {
            return <Loader />
        }
    }

    render() {
        const { gameText } = this.state;

        return (
            <div>
                <Intro message="Here you can find all of your most loved games" />
                Search: <input value={gameText} type="text" onChange={this.handleInputChange} />
                {this.handleInputEmpty(gameText)}
            </div>
        );
    }
};

export default Games;