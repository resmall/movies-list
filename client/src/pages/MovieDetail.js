import React, { Component } from 'react';
import api from '../services/api';

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
                    <div>Release Date: {this.state.movie.release_date}</div>
                    <div>Genres: {this.state.genres.map(({name}) => name).join(' | ') }</div>
                </div>
            );
        } else {
            return (<div>Its loading</div>)
        }
    }
}

export default MovieDetail;
