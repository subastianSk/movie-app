import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router";

import "./movie-grid.scss";

import MovieCard from "../movie-card/MovieCard";
import Button, { OutlineButton } from "../button/Button";
import Input from "../input/Input";

import tmdbApi, { category, movieType, tvType } from "../../api/tmdbApi";

const MovieGrid = (props) => {
  const [items, setItems] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const { keyword } = useParams();

  useEffect(() => {
    const getList = async () => {
      let response = null;
      if (keyword === undefined) {
        const params = {};
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(movieType.upcoming, {
              params
            });
            break;
          default:
            response = await tmdbApi.getTvList(tvType.popular, { params });
        }
      } else {
        const params = {
          query: keyword
        };
        response = await tmdbApi.search(props.category, { params });
      }
      setItems(response.results);
      setTotalPage(response.total_pages);
    };
    getList();
  }, [props.category, keyword]);

  const loadMore = async () => {
    let response = null;
    if (keyword === undefined) {
      const params = {
        page: page + 1
      };
      switch (props.category) {
        case category.movie:
          response = await tmdbApi.getMoviesList(movieType.upcoming, {
            params
          });
          break;
        default:
          response = await tmdbApi.getTvList(tvType.popular, { params });
      }
    } else {
      const params = {
        page: page + 1,
        query: keyword
      };
      response = await tmdbApi.search(props.category, { params });
    }
    setItems([...items, ...response.results]);
    setPage(page + 1);
  };

  return (
    <>
      <div className="section mb-3">
        <MovieSearch category={props.category} keyword={keyword} />
      </div>
      <div className="movie-grid">
        {items.map((item, i) => (
          <MovieCard category={props.category} item={item} key={i} />
        ))}
      </div>
      {page < totalPage ? (
        <div className="movie-grid__loadmore">
          <OutlineButton className="small" onClick={loadMore}>
            Load more
          </OutlineButton>
        </div>
      ) : null}
    </>
  );
};

const MovieSearch = (props) => {
  const history = useHistory();

  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");
  const [timer, setTimer] = useState(null);
  const goToSearch = useCallback(
    (e) => {
      if (e) {
        setKeyword(e.target.value);
        clearTimeout(timer);
        const timerTimeout = setTimeout(() => {
          if (e.target.value.trim().length > 0) {
            history.push(
              `/${category[props.category]}/search/${e.target.value}`
            );
          } else {
            history.push(`/${category[props.category]}`);
          }
        }, 500);
        setTimer(timerTimeout);
      }
    },
    [keyword, props.category, history]
  );

  useEffect(() => {
    console.log("from", history.location.state?.from);
    console.log("to", history.location.pathname);

    if (
      history.location.state?.from &&
      history.location.pathname !== history.location.state
    ) {
      setKeyword("");
    }
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [keyword, goToSearch]);

  return (
    <div className="movie-search">
      <Input
        type="text"
        placeholder="Enter keyword"
        value={keyword}
        onChange={goToSearch}
      />
      <Button className="small" onClick={goToSearch}>
        Search
      </Button>
    </div>
  );
};

export default MovieGrid;
