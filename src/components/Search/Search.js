import React from 'react';

function Search(props) {

    return (
        <input
          type="text"
          placeholder="Search Table"
          onChange={(e) => props.reactiveSearch(e)}
          className="mb-4"
        />
      );
    }
    
export default Search;