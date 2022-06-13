import React, { useState } from 'react';
import moviesContext from './context';

function Provider({children}){
   
    // const history = useHistory();

    const value = {
        
    }


  return (
    <moviesContext.Provider value={ value }>
      {children}
    </moviesContext.Provider>
  );
}

export default Provider;