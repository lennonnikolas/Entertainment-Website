import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';

const MovieListItem = ({ movies }) => (
    <li>
        <Link to={`/movie/${movies.id}`}>
            {movies.title}
        </Link>
    </li>
)

const MovieList = (props) => {
    const movies = props.list;
    return (
        <div>
            <ul className="movie-list">
                {movies && movies.map(movie => (
                    <MovieListItem movies={movie} key={movie.id} />
                ))}
            </ul>
        </div>
    )
}

export default MovieList;