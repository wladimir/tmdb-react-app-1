import React, { Component } from "react";
import Search from "./Search";
import Card from "./Card";
import "./App.css";
import { TMDB_API } from "./constants";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieId: ""
    };
  }

  componentDidMount() {
    this.fetchLatestMovie();
  }

  fetchMovieData() {
    const url = `${TMDB_API.TMDB_URL}/movie/${this.state.movieId}?&api_key=${
      process.env.REACT_APP_TMDB_API_KEY
    }`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({
          movieID: data.id,
          original_title: data.original_title,
          tagline: data.tagline,
          overview: data.overview,
          homepage: data.homepage,
          poster: data.poster_path,
          production: data.production_companies,
          production_countries: data.production_countries,
          genre: data.genres,
          release: data.release_date,
          vote: data.vote_average,
          runtime: data.runtime,
          revenue: data.revenue,
          backdrop: data.backdrop_path
        });

        console.log(this.state);
      })
      .catch(e => {
        console.error(e);
        this.setState({ moviedId: "" });
      });
  }

  fetchLatestMovie() {
    fetch(
      `${TMDB_API.TMDB_URL}/discover/movie?sort_by=popularity.desc&api_key=${
        process.env.REACT_APP_TMDB_API_KEY
      }`
    )
      .then(res => res.json())
      .then(data => {
        const movieId = data.results[0].id;
        this.setState({ movieId });

        this.fetchMovieData();
      })
      .catch(e => {
        console.error(e);
        this.setState({ moviedId: "" });
      });
  }

  render() {
    return (
      <div className="App">
        <Search fetchMovieData={this.fetchMovieData.bind(this)} />
        <Card data={this.state} />
      </div>
    );
  }
}

export default App;
