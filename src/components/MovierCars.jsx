import React, { useContext, useState } from 'react';
import APIS from '../services/MoviesAPI';
import Context from '../context/context';

export default function MovieCard({id,poster_path,original_title,filmes}){
    const {setSelectedMovie} = useContext(Context);
    const img_path = "https://image.tmdb.org/t/p/";
    return (poster_path ? (
        <div>
          <section
            className="moviePoster"
            onClick={() => APIS.fetchVids(id)}
          >
            <img
              key={id}
              src={`${img_path}w500/${poster_path}`}
              alt={`${original_title} poster`}
              onClick={() => setSelectedMovie(filmes)}
            />
            <div>
              <h3>{original_title}</h3>
            </div>
          </section>
        </div>
      ) : (
        <div>
          No poster found
          <h3> {original_title} </h3>
        </div>
      ))
}