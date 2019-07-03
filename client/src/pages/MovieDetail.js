import React, { Component } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom'
import Movie from '../components/Movie';

class MovieDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie_id: props.match.params.movie_id,
            movie: {},
            genres: [],
            loaded: false
        }
    }

    async componentDidMount() {
        const response = await api.get(`movies/${this.state.movie_id}`);
        console.log(response.data.genres)
        this.setState({ movie: response.data, genres: response.data.genres, loaded: true });
    }

    render () {
        if (this.state.loaded) {
            return (
                <div>
                <h1>{this.state.movie.title}</h1>
                <img src={this.state.movie.poster_path} alt="movie poster"/>
                <h2>Overview</h2>
                <p>
                    {this.state.movie.overview}
                </p>
                <span>Release Date: {this.state.movie.release_date}</span>
                <span>Genres: {this.state.genres.map(({name}) => name).join(', ') }</span>
                </div>
            );
        } else {
            return (<div>Its loading</div>)
        }
    }
}

export default MovieDetail;