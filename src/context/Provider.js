import React, { useState } from 'react';
import moviesContext from './context';

function Provider({children}){
  const [movies, setMovies] = useState([]);
  const [trailer, setTrailer] = useState({});
  const [selectedMovie, setSelectedMovie] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [playTrailer, setPlayTrailer] = useState(false);
  const [categories, setCategories] = useState([]);
  const [movieDetails, setMovieDetails] = useState([]);
   
    // const history = useHistory();

    const value = {
      movies,
      setMovies,
      trailer,
      setTrailer,
      selectedMovie,
      setSelectedMovie,
      searchValue,
      setSearchValue,
      playTrailer,
      setPlayTrailer,
      categories,
      setCategories,
      movieDetails,
      setMovieDetails,
    }


  return (
    <moviesContext.Provider value={ value }>
      {children}
    </moviesContext.Provider>
  );
}

export default Provider;