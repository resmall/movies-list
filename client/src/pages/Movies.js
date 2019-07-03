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
            isSearching: false,
            apiNav: {
                totalPages: 0,
                totalResults: 0,
                currentPage: 0
            }
        }
    }

    handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        if (this.state.apiNav.totalPages !== this.state.apiNav.currentPage) {
            let nextPage = this.state.page + 1;
            console.log("nextpage" + nextPage, this.state.apiNav, "Current state page" + this.state.page )
            this.setState({isFetching: true, page: nextPage});
        }
    }

    fetchUpcomingMovies = async () => {
        const response = await api.get(`movies?page=${this.state.page}`);
        const apiNav = this.getAPINavParams(response.headers)
        this.setState({ movies: this.state.movies.concat(response.data), isFetching: false, apiNav });
    }

    fetchSearch = async () => {
        const response = await api.get(`movies/search?term=${this.state.term}&page=${this.state.page}`);
        const apiNav = this.getAPINavParams(response.headers)
        this.setState({ movies: response.data, isSearching: false, apiNav });
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

    componentDidUpdate() {
        if (this.state.isFetching) {
            this.fetchUpcomingMovies();
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
