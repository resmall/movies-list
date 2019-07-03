import React, { Component } from 'react';
import api from '../services/api';
import Movie from '../components/Movie';

import './Movies.css'

class Movies extends Component {

    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            page: 1,
            term: '',
            apiNav: {
                totalPages: 0,
                totalResults: 0,
                currentPage: 0
            },
            operation: 'upcoming'
        }
    }

    handleScroll = async () => {
        console.log('hanle')
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        if (this.state.apiNav.totalPages !== this.state.apiNav.currentPage) {
            let nextPage = this.state.page + 1;

            this.setState({page: nextPage});

            if (this.state.operation === 'upcoming') {
                await this.fetchUpcomingMovies(nextPage);
            } else if (this.state.operation === 'search') {
                await this.fetchSearch(nextPage);
            }
        }
    }

    fetchUpcomingMovies = async (nextPage) => {
        console.log('fetchupcoming')
        const response = await api.get(`movies?page=${nextPage ? 1 : nextPage}`);
        this.setState({ movies: this.state.movies.concat(response.data), apiNav });
    }

    fetchSearch = async (nextPage) => {
        console.log('fetchsearch')
        const response = await api.get(`movies/search?term=${this.state.term}&page=${nextPage ? 1 : nextPage}`);
        this.setState({ movies: response.data, apiNav});
    }

    async componentDidUpdate() {
        console.log('componentdidupdate')
    }

    async componentDidMount() {
        await this.fetchUpcomingMovies()
        window.addEventListener('scroll', this.handleScroll);
    }

    getAPINavParams = (headers) => {
        console.log(headers)
        return {
            currentPage: parseInt(headers['x-page']),
            totalPages: parseInt(headers['x-total-pages']),
            totalResults: parseInt(headers['x-total'])
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    search = async (e) => {
    console.log('searching', this.term.value)
        this.setState({term: this.term.value});
        await this.fetchSearch();
        this.setState({term: this.term.value, isSearching: true});
    }

    render () {
        return (
            <div>
                <form onSubmit={this.search}>
                    <button type="button" onClick={() => this.router('search')}>Search</button>
                    <button type="button" onClick={this.search}>Search</button>
                </form>

                <button className="button-link" onClick={this.fetchUpcomingMovies}>Upcoming Movies</button>

                { this.state.movies.map(movie => (
                    <Movie movie={movie} key={movie.id}/>
                ))}
            </div>
        );
    }
}

export default Movies;
