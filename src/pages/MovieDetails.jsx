import React, { useContext, useEffect, useState } from "react";
import context from "../context/context";


export default function MovieDetails() {
  
  const [movie, setMovie] = useState(null);

  const {movieDetails} = useContext(context);

  // useEffect(() => {
    
  // }, []);

  console.log(movieDetails);
  return (
    <div>
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
    </div>
  );
}