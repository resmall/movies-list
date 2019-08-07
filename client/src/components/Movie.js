import React from 'react';
import {
    Link
} from 'react-router-dom'


export default class Movie extends React.Component {

    render() {
        return (
            <div>
                <div>
                    <img src={this.props.movie.poster_path} alt="movie poster" />
                </div>
                <div>
                    <h1><Link to={`movies/${this.props.movie.id}`}>{this.props.movie.title}</Link></h1>
                    <span>{this.props.movie.genres} - Release on: {this.props.movie.release_date}</span>
                </div>
            </div>
        );
    };
}