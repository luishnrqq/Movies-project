import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';

function MovieCard({id,poster_path,original_title}){

    return (poster_path ? (
        <div>
          <section
            className="moviePoster"
            onClick={() => fetchVids(id)}
          >
            <img
              key={id}
              src={`${img_path}w500/${poster_path}`}
              alt={`${original_title} poster`}
              onClick={() => setSelectedMovie(}
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