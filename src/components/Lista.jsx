import React, { useContext, useEffect, useState } from "react";
import "./movies_posters.css";
import Header from "./Header";
import Footer from "./Footer";
import YouTube from "react-youtube";
import APIS from "../services/MoviesAPI";
import MovierCars from "./MovierCars";

function Lista() {
  const [movies, setMovies] = useState([]);
  const [trailer, setTrailer] = useState({});
  const [selectedMovie, setSelectedMovie] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [playTrailer, setPlayTrailer] = useState(false);
  const [categories, setCategories] = useState([]);
  const [pag, setPag] = useState(1);
  const img_path = "https://image.tmdb.org/t/p/";
  const url = "https://api.themoviedb.org/3";



  // const changePag = () => {
  //   setPag(pag + 1);
  // }

  // const changePagBack = () => {
  //   setPag(pag - 1);
  // }

  const backToTop = () => {
    window.scrollTo(0, 0);
  };

  const fetchMovies = async (searchValue) => {
    const type = searchValue
      ? `search/multi?api_key=5765081a2a932c58200cc8aa4b8eecf9&language=en-Us&query=${searchValue}&page=1&include_adult=false`
      : `discover/movie?api_key=5765081a2a932c58200cc8aa4b8eecf9&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pag}&with_watch_monetization_types=flatrate`;
    const data = await fetch(`${url}/${type}`)
      .then((response) => response.json())
      .catch((err) => console.log(err));

    // const pages = data.find((f) => console.log(f));
    
    setMovies(data.results);
    setSelectedMovie(data.results[0]);
    fetchVids(selectedMovie.id);
  };

  const fetchVids = async (id) => {
    const data = await fetch(
      `${url}/movie/${id}/videos?api_key=5765081a2a932c58200cc8aa4b8eecf9&language=en-US`
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
    const oficial = data.results.find((film) => film.name.includes("Official"));

    setTrailer(oficial);
  };

  const fetchCategories = async () => {
    const { genres } = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=5765081a2a932c58200cc8aa4b8eecf9&language=en-US"
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
    setCategories(genres);
  };

  const findByCategory = (cat_id) => {
    const result = movies.filter((filmes) => filmes.genre_ids === cat_id);
    // setMoviesCat(result);
  };

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
    fetchVids();
   
  }, []);

  return (
    <>
      <Header />
      <div
        className="hero-content max-center"
        style={{
          backgroundImage: `url(${img_path}original/${selectedMovie.backdrop_path})`,
        }}
      >
        <div className="hero" key={selectedMovie.name}>
          {playTrailer ? (
            <YouTube videoId={trailer.key} className="video" />
          ) : null}
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

      <form onSubmit={searchMovies} className="browse-container">
        <div className="category">
          <span>Browse by</span>
          {
            <select
              className="genders"
              onChange={({ target }) => findByCategory(target.value)}
            >
              <option className="gender-options" value="default">
                Genre
              </option>
              {categories.map((ctgrs) => (
                <option
                  className="gender-options"
                  value={ctgrs.id}
                  key={ctgrs.id}
                >
                  {ctgrs.name}
                </option>
              ))}
            </select>
          }
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
      <button id="back-btn" onClick={() => backToTop()}>/\</button>
      {/* <section id="page-section">
        <button disabled={pag < 1 ? true : false} onClick={ ()=>setPag(pag-1)} >Prev</button><button onClick={()=>setPag(pag+1)}>Next</button>
      </section> */}
      <Footer />
    </>
  );
}

export default Lista;
