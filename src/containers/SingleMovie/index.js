import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';
import './index.css'

class SingleMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieId: props.match.params.id,
            movie: null,
            isFetching: false
        }
    }
 
    componentDidMount() {
        const {movieId} = this.state;
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=9deb5dea0278246a295fd24b00780716`)
        .then(response => response.json())
        .then(json => this.setState({ movie: json }))
    }

    render() {
        const {movie} = this.state;
        const genres = movie && movie.genres.map(genres => genres.name)
        return (
            <div>
                <h1>{movie && movie.title}</h1>
                <div><p>Genre: {(movie && genres.map(genre => genre).join(', ')) || 'None'}</p></div>
                <div>
                    <img className="show-image" src={movie && `https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie && movie.title} />
                </div>
                <div>
                    <strong>Released:</strong> {movie && movie.release_date}
                </div>
                <div>
                    <p><strong>Summary: </strong>{movie && movie.overview}</p>
                </div>
                <div><Link to={'/movies'}>Back</Link></div>
            </div>
        )
    }
}

export default SingleMovie;