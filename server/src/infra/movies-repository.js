
module.exports.makeMoviesDb = ({api}) => {

    const findUpcomingMovies = async (page) => {
        const response = await api.get(`movie/upcoming?api_key=${process.env.API_KEY}`);
        const results = response.data.results;
        const ret = results.map( ({name, poster_path, genre_ids, release_date}) => {
            return {
                name,
                poster_path,
                genre: genre_ids,
                release_date
            }
        })

        return ret;
    }

    return Object.freeze({
        findUpcomingMovies,
    })
}