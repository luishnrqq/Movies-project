const url = "https://api.themoviedb.org/3";


const fetchMovies = async (searchValue,pag) => {
  const type = searchValue
    ? `search/multi?api_key=3e9594956f7bdfe6a28130cd66f6d581&language=en-Us&query=${searchValue}&page=1&include_adult=false`
    : `discover/movie?api_key=3e9594956f7bdfe6a28130cd66f6d581&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pag}&with_watch_monetization_types=flatrate`;
  const data = await fetch(`${url}/${type}`)
    .then((response) => response.json())
    .catch((err) => console.log(err));

  // const pages = data.find((f) => console.log(f));
  
  // setMovies(data.results);
  // setSelectedMovie(data.results[0]);
  // fetchVids(selectedMovie.id);
  return data;
};

const fetchVids = async (id) => {
  const data = await fetch(
    `${url}/movie/${id}/videos?api_key=3e9594956f7bdfe6a28130cd66f6d581&language=en-US`
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
  const oficial = data.results.find((film) => film.name.includes("Official"));

  // setTrailer(oficial);
  return oficial;
};

const fetchCategories = async () => {
  const { genres } = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=3e9594956f7bdfe6a28130cd66f6d581&language=en-US"
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
  // setCategories(genres);
  return genres;
};

export default {
  fetchMovies,
  fetchVids,
  fetchCategories,
}