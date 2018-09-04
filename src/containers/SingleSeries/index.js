import React, { Component } from 'react';
import Loader from '../../components/Loader';
import { Link } from 'react-router-dom';
import './index.css'

class SingleSeries extends Component {
    state = {
        show: null,
        season: null
    }

    componentDidMount() {
        const { id } = this.props.match.params

        fetch(`https://api.tvmaze.com/shows/${id}?embed=episodes`)
        .then(response => response.json())
        .then(json => this.setState({show: json}))

        fetch(`http://api.tvmaze.com/shows/${id}/seasons`)
        .then(response => response.json())
        .then(json => this.setState({ season: json }));

    }

    strip(html){
        var doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
     }

    displayContent() {
        const {show, season} = this.state;

        if (show !== null && season !== null) {
            const genres = show.genres.map(genre => genre)
            const seasonList = season.map(season => <li key={season.number}><Link to={`/episodes/${show.id}/${season.number}`}>Season {season.number}</Link> - episodes: {season.episodeOrder || 'Being filmed'}</li>)

            return <div>
                <h1>{show.name}</h1>
                <p>Genre: {genres.join(', ')}</p>
                <img className="show-image" src={show.image.original} alt={show.name}/>
                <p>{this.strip(show.summary)}</p>
                <div>
                    <h1>Seasons</h1>
                    {season && seasonList}
                </div>
            </div>
        }
        return <Loader />
    }

    render() {
        return(
            <div>
                {this.displayContent()}
            </div>
        )
    }
};

export default SingleSeries;