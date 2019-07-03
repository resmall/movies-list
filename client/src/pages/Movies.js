import React, { Component } from 'react';
import api from '../services/api';
import Movie from '../components/Movie';

import './Movies.css'

class Movies extends Component {

    constructor(props) {
        super(props)
        this.term = ''
        this.state = {
            movies: [],
            page: 1,

            apiNav: {
                totalPages: 0,
                totalResults: 0,
                currentPage: 0
            },
            operation: 'upcoming'
        }
    }

    handleScroll = async () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        if (this.state.apiNav.totalPages !== this.state.apiNav.currentPage) {

            let nextPage = this.state.page + 1;

            this.setState({page: nextPage});

            console.log(`Paginating for operation: ${this.state.operation} and query for page ${nextPage}`)
            console.log(`Paginating for operation: ${this.state.operation} and query for page ${nextPage}`)

            if (this.state.operation === 'upcoming') {
                await this.fetchUpcomingMovies(nextPage);
            } else if (this.state.operation === 'search') {
                console.log('will go for search')
                await this.fetchSearch(nextPage);
            }
        }
    }

    fetchUpcomingMovies = async (nextPage) => {
        console.log('fetchupcoming')
        const response = await api.get(`movies?page=${nextPage ? 1 : nextPage}`);
        const apiNav = this.getAPINavParams(response.headers);
        this.setState({ movies: response.data, apiNav });
    }

    fetchSearch = async (page) => {
        page = !page ? 1 : page;
        console.log(`Search term is ${this.term.value} and page is ${page}`)
        const response = await api.get(`movies/search?term=${this.term.value}&page=${page}`);
        const apiNav = this.getAPINavParams(response.headers);
        if (page > 1) {
            console.log('concat')
            this.setState({ movies: this.state.movies.concat(response.data), apiNav});
        } else {
            this.setState({ movies: response.data, apiNav});
        }
    }

    search = async (e) => {
        e.preventDefault()
        console.log('searching', )
        this.setState({operation: 'search'});
        console.log('op is searching')
        await this.fetchSearch();
    }

    // async componentDidUpdate() {
    //     console.log('componentdidupdate')
    // }

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



    render () {
        return (
            <div>
                <form onSubmit={this.search}>
                    <input type="text" ref={(c) => this.term = c} name="term" />
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
