import React, { useContext, useEffect, useState } from "react";
import context from "../context/context";
import "./movies_posters.css";
import Header from "./Header";
import Footer from "./Footer";
import YouTube from "react-youtube";

function Lista() {
  const [movies, setMovies] = useState([]);
  const [trailer, setTrailer] = useState({});
  const [selectedMovie, setSelectedMovie] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [playTrailer, setPlayTrailer] = useState(false);
  const [categories, setCategories] = useState([]);
  const img_path = "https://image.tmdb.org/t/p/";
  const url = "https://api.themoviedb.org/3";
  

  const fetchMovies = async (searchValue) => {
    const type = searchValue
      ? `search/multi?api_key=3e9594956f7bdfe6a28130cd66f6d581&language=en-Us&query=${searchValue}&page=1&include_adult=false`
      : "discover/movie?api_key=3e9594956f7bdfe6a28130cd66f6d581";
    const data = await fetch(`${url}/${type}`)
      .then((response) => response.json())
      .catch((err) => console.log(err));
    
    setMovies(data.results);
    setSelectedMovie(data.results[0]);
    return fetchVids(selectedMovie.id);
  };

  const fetchVids = async (id) => {
    const data = await fetch(
      `${url}/movie/${id}/videos?api_key=3e9594956f7bdfe6a28130cd66f6d581&language=en-US`
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
    const oficial = data.results.find((film) => film.name.includes("Official"));

    setTrailer(oficial);
  };

  const fetchCategories = async () => {
    const { genres } = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=3e9594956f7bdfe6a28130cd66f6d581&language=en-US"
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
    setCategories(genres);
  };

  const findByCategory = (cat_id) =>{ 

    const result = movies.filter((filmes) => filmes.genre_ids === cat_id);
    // setMoviesCat(result);
  }

  const settrailer = () => {
    setPlayTrailer(true);
  };

  const closeTrailer = () => {
    setPlayTrailer(false);
  };

  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchValue);
  };

  useEffect(() => {
    fetchMovies();
    fetchCategories();
   
  }, []);
  console.log();

  return (
    <>
      <Header />
      <div
        className="hero-content max-center"
        style={{
          backgroundImage: `url(${img_path}original/${selectedMovie.backdrop_path})`,
        }}
      >
        <div className="hero">
          {playTrailer ? <YouTube videoId={trailer.key} className='video' /> : null}
          <button onClick={() => settrailer()} id="hero-button">
            Play trailer
          </button>
          {playTrailer ? (
            <button onClick={() => closeTrailer()}>Close trailer</button>
          ) : null}
          <h1 id="hero-title">{selectedMovie.title}</h1>
          <p className="hero-overview">{selectedMovie.overview}</p>
        </div>
      </div>

      <form onSubmit={searchMovies} className='browse-container' >
       
        <div className="category">
            <span>Browse by</span>
        {  <select className="genders" onChange={ ({target})=>   findByCategory(target.value)}   >
        <option className="gender-options" value='default'>Genre</option>
          {categories.map((ctgrs) => (
            <option className="gender-options" value={ctgrs.id}  key={ctgrs.id} >{ctgrs.name}</option>
          ))}
        </select> }
        </div>
        <input
          className="search-movie"
          placeholder="Find a film"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button className="search-btn">Search</button>
      </form>
      <section className="container-posters">
        {movies.map((filmes) =>
          filmes.poster_path ? (
            <div>
              <section
                className="moviePoster"
                onClick={() => fetchVids(filmes.id)}
              >
                <img
                  key={filmes.id}
                  src={`${img_path}w500/${filmes.poster_path}`}
                  alt={`${filmes.original_title} poster`}
                  onClick={() => setSelectedMovie(filmes)}
                />
                <div>
                  <h3>{filmes.original_title}</h3>
                </div>
              </section>
            </div>
          ) : (
            <div>
              No poster found
              <h3> {filmes.original_title} </h3>
            </div>
          )
        )}
      </section>
      
      <Footer/>
    </>
  );
}

export default Lista;
