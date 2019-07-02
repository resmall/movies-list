import React, { Component } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom'
import Movie from '../components/Movie';

class Movies extends Component {
    state = {
        movies: [],
    }

    async componentDidMount() {
        const response = await api.get('movies');
        this.setState({ movies: response.data });
    }

    render () {
        return (
            <div>
                { this.state.movies.map(movie => (
                    <Movie movie={movie} />
                ))}
            </div>
        );
    }
}

export default Movies;
