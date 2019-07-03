import React, { Component } from 'react';
import api from '../services/api';
import Movie from '../components/Movie';

import './Movies.css'

class Movies extends Component {

    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            isFetching: false,
            page: 1,
            term: '',
            isSearching: false
        }
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
        await this.index()
        window.addEventListener('scroll', this.handleScroll);
    }

    index = async () => {
        const response = await api.get('movies');
        this.setState({ movies: response.data });
    }

    componentDidUpdate() {
        console.log('updated')
        if (this.state.isFetching) {
            this.fetchMoreListItems();
        } else if (this.state.isSearching) {
            this.fetchSearch();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    search = async (e) => {
        e.preventDefault();
        console.log('searching', this.term.value)
        if (this.term.value) {
            this.setState({term: this.term.value, isSearching: true});
        }
    }

    fetchSearch = async () => {
        const response = await api.get(`movies/search?term=${this.state.term}&page=${this.state.page}`);
        this.setState({ movies: response.data, isSearching: false });
    }

    render () {
        return (
            <div>
                <div>
                    <form onSubmit={this.search}>
                        <input type="text" ref={(c) => this.term = c} name="term" />
                        <button type="button" onClick={this.search}>Search</button>
                    </form>

                    <button className="button-link" onClick={this.index}>Upcoming Movies</button>

                    { this.state.movies.map(movie => (
                        <Movie movie={movie} key={movie.id}/>
                    ))}
                    {this.state.isFetching && 'Fetching more list items...'}
                </div>
            </div>
        );
    }
}

export default Movies;
