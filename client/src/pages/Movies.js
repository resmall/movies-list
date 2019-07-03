import React, { Component, useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom'
import Movie from '../components/Movie';

class Movies extends Component {
    state = {
        movies: [],
        isFetching: false,
        page: 1
    }

    handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        let nextPage = this.state.page + 1;
        this.setState({isFetching: true, page: nextPage});
    }

    fetchMoreListItems = async () => {
        const response = await api.get(`movies?page=${this.state.page}`);
        this.setState({ movies: this.state.movies.concat(response.data), isFetching: false });
    }

    async componentDidMount() {
        const response = await api.get('movies');
        this.setState({ movies: response.data });
        window.addEventListener('scroll', this.handleScroll);
    }

    componentDidUpdate() {
        if (!this.state.isFetching) return;
        this.fetchMoreListItems();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render () {
        return (
            <div>
                { this.state.movies.map(movie => (
                    <Movie movie={movie} />
                ))}
                {this.state.isFetching && 'Fetching more list items...'}
            </div>
        );
    }
}

export default Movies;
