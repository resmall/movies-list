import React, { Component } from 'react';
import api from '../services/api';
import Movie from '../components/Movie';

class Search extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
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
        const response = await api.get(`movies/search?term=${this.state.term}&page=${this.state.page}`);
        this.setState({ movies: this.state.movies.concat(response.data), isFetching: false });
    }

    fetchResults = async () => {
        const response = await api.get(`movies/search?term=${this.state.term}&page=${this.state.page}`);
        this.setState({ movies: response.data, isSearching: false });
    }

    onSubmit = async (e) => {
        e.preventDefault();
        console.log('submited')
        this.setState({term: this.term.value, isSearching: true});
    }

    async componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentDidUpdate() {
        if (this.state.isFetching) {
            this.fetchMoreListItems();
        } else if (this.state.isSearching) {
            this.fetchResults();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render () {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input type="text" ref={(c) => this.term = c} name="term" />
                    <button type="button" onClick={this.onSubmit}>Search</button>
                </form>

                { this.state.movies.map(movie => (
                    <Movie movie={movie} key={movie.id}/>
                ))}
                {this.state.isFetching && 'Fetching more list items...'}
            </div>
        );
    }
}

export default Search;
