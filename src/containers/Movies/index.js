import React, { Component } from 'react';
import Loader from '../../components/Loader';
import Intro from '../../components/Intro';
import MovieList from '../../components/MovieList';
import 'whatwg-fetch';

class Movie extends Component {
    state = {
        movies: [],
        movieText: '',
        isFetching: false
    }

    handleInputChange = e => {
        this.setState({ movieText: e.target.value, isFetching: true })
        fetch(`
        https://api.themoviedb.org/3/search/movie?api_key=9deb5dea0278246a295fd24b00780716&query=${e.target.value}`)
        .then(response => response.json())
        .then(json => this.setState({ movies: json, isFetching: false }))
        .catch(function() {
            console.log("error");
        })
    }

    renderMovieList = (movies, isFetching) => {
        if (!isFetching)
            return <li>{movies.results.title}</li>
        }

    render() {
        const {movieText, movies, isFetching} = this.state;
        return(
            <div>
                <Intro message="Here you can find all of your most loved movies" />
                Search: <input value={movieText} type="text" onChange={movies && this.handleInputChange} />
                { 
                    isFetching 
                    &&
                    <Loader />
                }
                {
                    !isFetching
                    &&
                    <MovieList list={movies.results} />
                }
                {
                    !isFetching && movies.length === 0 && movieText.trim() !== ''
                    &&
                    <p>No results found for that movie name</p>
                }
                {
                    !isFetching && movieText.trim() === '' && movies.length === 0
                    &&
                    <p>Please enter a movie title</p>
                }

            </div>
        );
    }
}

export default Movie;