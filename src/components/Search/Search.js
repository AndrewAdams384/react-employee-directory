import React, { useContext }from 'react';
import EmployeeContext from "../../utils/EmployeeContext";

const Search = () => {
    const data = useContext(EmployeeContext);

    return (
        <div class="search-bar">
            <form>
                <button type="submit" onClick={event => event.preventDefault()}><i className="fas fa-search"></i></button>
                <input type ="search" placeholder="Search" onChange={event => data.handleSearch(event)}/>
            </form>
        </div>
    )
}

export default Search;