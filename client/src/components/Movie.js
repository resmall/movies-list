import React from 'react';
import {
    Link
} from 'react-router-dom'


export default class Movie extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        title: '',
        poster_path: '',
        genres: [],
        release_date: '',
        overview: ''
    }

    render() {
        return (
            <div>
                <div>
                    <img src={this.props.movie.poster_path} alt="move poster" />
                </div>
                <div>
                    <h1>{this.props.movie.title}</h1>
                    <p>{this.props.movie.overview}</p>

                    <span>{this.props.movie.genres} - Release on: {this.props.movie.release_date}</span>
                </div>
            </div>
        );
    };
}