import React, { Component } from 'react';
import Loader from '../../components/Loader';
import {Link} from 'react-router-dom';
import './index.css'

class SingleSeriesSeason extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: null,
            id: props.match.params.id,
            season: props.match.params.seasonNumber,
            seasonInfo: null,
            episodes: [],
            isFetching: false
        }
    }

    componentDidMount() {
        const id = this.state.id;
        fetch(`http://api.tvmaze.com/shows/${id}/episodes`)
        .then(response => response.json(), this.setState({ isFetching: true}))
        .then(json => this.setState({ episodes: json, isFetching: false }));

        fetch(`https://api.tvmaze.com/shows/${id}?embed=episodes`)
        .then(response => response.json(), this.setState({ isFetching: true}))
        .then(json => this.setState({ show: json, isFetching: false }));

        fetch(`http://api.tvmaze.com/shows/${id}/seasons`)
        .then(response => response.json(), this.setState({ isFetching: true}))
        .then(json => this.setState({ seasonInfo: json, isFetching: false }));
    }

    listOfEpisodes = () => {
        const episodes = this.state.episodes;
        const currSeason = this.state.season;
        const seasonEpisode = episodes.map(episode => String(episode.season) === currSeason && episode);
        return seasonEpisode.map(episode => 
            episode 
            && 
            <li className="episode-list" key={episode.id}>
                <strong>Episode {episode.number}: {episode.name}</strong>
                <p>Summary: <i>{this.strip(episode.summary)}</i></p>
            </li>
        );
    }

    strip(html){
        var doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
     }

    displaySeasonImage = () => {
        const { season, seasonInfo, isFetching } = this.state;
        const currSeason = season;
        const seasonImgs = seasonInfo && seasonInfo.map(season => season.number === Number(currSeason) && season.image);
        if (!isFetching)
            return seasonImgs && seasonImgs.map(image => image && <img src={image.medium} alt={season.name} />);
        return <Loader />
    }

    render() {
        const {show, season, id} = this.state;
        return (
            <div>
                <h2>List of Episodes for Season {season} of {show && show.name}</h2>
                    {this.displaySeasonImage()}
                    <div className="episode-list-container">{this.listOfEpisodes()}</div>
                <div>
                    <p><Link to={`/series/${id}`}>Back</Link></p>
                </div>
            </div>
        );
    }
}

export default SingleSeriesSeason;