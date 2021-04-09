import React, { useState, useEffect } from "react";
import Search from "../Search/Search";
import API from "../../utils/API";

const Table = () => {
  const [employees, setEmployees] = useState([]);
  const [currentSort, setCurrentSort] = useState("default");
  const [search, setSearch] = useState(null);

  useEffect(() => {
    API.getEmployees()
      .then((res) => {
        if (res.data.results.length === 0) {
          throw new Error("No results found.");
        }
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }

        setEmployees(res.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  const sort = () => {
    let nextSort;
    if (currentSort === "down") nextSort = "up";
    else if (currentSort === "up") nextSort = "default";
    else if (currentSort === "default") nextSort = "down";
    setCurrentSort(nextSort);
  };

  const reactiveSearch = (event) => {
    let keyword = event.target.value;
    setSearch(keyword);
  };

  const sorts = {
    up: {
      class: "sort-up",
      fn: (a, b) => a.dob.age - b.dob.age,
    },
    down: {
      class: "sort-down",
      fn: (a, b) => b.dob.age - a.dob.age,
    },
    default: {
      class: "sort",
      fn: (a, b) => a,
    },
  };

  return employees.length > 0 ? ( 
    <div>
      <Search reactiveSearch={reactiveSearch} />

      <table className="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Location</th>
            <th scope="col">
              Age{""}
              <button onClick={sort}>
              ⭥
                <i className={`fas fa-${sorts[currentSort].class}`} />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {employees // sorts and then searches from employees hook
            .sort(sorts[currentSort].fn)
            .filter((data) => {
              if (search == null) return data;
              else if (
                data.name.first.toLowerCase().includes(search.toLowerCase()) ||
                data.name.last.toLowerCase().includes(search.toLowerCase()) ||
                data.location.city
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                data.location.state.toLowerCase().includes(search.toLowerCase())
              ) {
                return data;
              }
            })
            .map((data) => {
              return (
                <tr keys={data.email}>
                  <th scope="row">
                    <img src={data.picture.thumbnail} alt="headshot"></img>
                  </th>
                  <td>{data.name.first}</td>
                  <td>{data.name.last}</td>
                  <td>{`${data.location.city}, ${data.location.state}`}</td>
                  <td>{data.dob.age}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  ) : null;
};

export default Table