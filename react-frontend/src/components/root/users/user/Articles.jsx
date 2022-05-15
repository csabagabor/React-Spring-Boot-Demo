import React from "react";
import { useState, useLayoutEffect } from "react";
import ArticlesDataService from "../../../../api/articles/ArticlesDataService";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = React.useState('');

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchClick = (event) => {
    console.log("searching for " + search)
      let unmounted = false;

      ArticlesDataService(search).then((response) => {
        if (!unmounted) {
          setArticles(response.data);
        }
      });

  };

  return (
      <>
        <label htmlFor="search">
          Search by keyword:
          <input id="search" type="text" onChange={handleSearch} />
          <button type="button" onClick={handleSearchClick}>Search</button>

        </label>

        <table>
          <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Url</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          </thead>
          <tbody>
          {articles.map(article => {
            return (
                <tr key={article.title}>
                  <td> {article.title} </td>
                  <td> {article.description} </td>
                  <td> {article.url}</td>
                  <td> {article.author}</td>
                  <td> {article.published}</td>
                </tr>
            );
          })}
          </tbody>
        </table>
      </>
  );
};

export default Articles;
