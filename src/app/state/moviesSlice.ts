import { AnyAction, createSlice } from "@reduxjs/toolkit";
import {
  getImages,
  getMoviesWithParams,
  getRequest,
  getRequestVideoMovie
} from "../../services/httpRequest";
import { Movie } from "../..//models/Movie";
import { CardMovie } from "../../models/CardMovie";
import { Dispatch } from "react";
import { Review } from "../../models/Review";
import { Imagen } from "../../models/Imagen";
export const initialListReview: Array<Review> = [];
export const initialList: Array<CardMovie> = [];
export const initialListImages: Array<Imagen> = [];
export const initialMovie: Movie = {
  adult: false,
  backdrop_path: "",
  belongs_to_collection: {
    id: 0,
    name: "",
    poster_path: "",
    backdrop_path: ""
  },
  budget: 0,
  genres: [],
  homepage: "",
  id: 0,
  imdb_id: "",
  original_language: "",
  original_title: "",
  overview: "",
  popularity: 0,
  poster_path: "",
  production_companies: [],
  production_countries: [],
  release_date: "",
  revenue: 0,
  runtime: 0,
  spoken_languages: [],
  status: "",
  tagline: "",
  title: "",
  video: false,
  vote_average: 0,
  vote_count: 0
};

export const MovieSlice = createSlice({
  name: "movies",
  initialState: {
    movie: {
      item: initialMovie,
      video: "",
      images: initialListImages
    },
    moviesByCategorySlice: {
      list: initialList
    },
    moviesTrend: {
      list: initialList
    },
    moviesUpcoming: {
      list: initialList
    },
    similarMovies: {
      list: initialList
    },
    recommendationsMovies: {
      list: initialList
    },
    reviewsMovie: {
      list: initialListReview
    },
    discoverMovie: {
      list: initialListReview
    }
  },
  reducers: {
    setMovie: (state, action) => {
      state.movie.item = action.payload;
    },
    setMoviesByCategory: (state, action) => {
      state.moviesByCategorySlice.list.push(...action.payload);
    },
    setMoviesTrendList: (state, action) => {
      state.moviesTrend.list.length
        ? state.moviesTrend.list.push(...action.payload)
        : (state.moviesTrend.list = action.payload);
    },
    setMoviesUpcomingList: (state, action) => {
      state.moviesUpcoming.list = action.payload;
    },
    setSimilarMovies: (state, action) => {
      state.similarMovies.list = action.payload;
    },
    setRecommendationsMovies: (state, action) => {
      state.recommendationsMovies.list = action.payload;
    },
    setReviewsMovies: (state, action) => {
      state.reviewsMovie.list = action.payload;
    },
    setMovieVideo: (state, action) => {
      action.payload
        ? (state.movie.video = `https://www.youtube.com/embed/${action.payload}`)
        : (state.movie.video = action.payload);
    },
    setMovieImages: (state, action) => {
      state.movie.images = action.payload;
    },
    setDiscoverMovies: (state, action) => {
      state.discoverMovie.list = action.payload;
    }
  }
});

export const {
  setMovie,
  setMoviesByCategory,
  setMoviesTrendList,
  setSimilarMovies,
  setReviewsMovies,
  setMovieVideo,
  setMoviesUpcomingList,
  setRecommendationsMovies,
  setMovieImages,
  setDiscoverMovies
} = MovieSlice.actions;

export default MovieSlice.reducer;

export const getMovie =
  (id: number | string): any =>
  async (dispatch: Dispatch<AnyAction>) => {
    try {
      const results = await getRequest("movie/" + id);
      dispatch(setMovie(results));
    } catch (error) {
      console.log(error);
    }
  };
export const getMovieByCategory =
  (id: string, page: number): any =>
  async (dispatch: Dispatch<AnyAction>) => {
    try {
      const { results } = await getMoviesWithParams(
        `discover/movie/?with_genres=${id}&page=${page}`
      );
      dispatch(setMoviesByCategory(results));
    } catch (error) {
      console.log(error);
    }
  };
export const getTrendMovies =
  (page: number = 1): any =>
  async (dispatch: Dispatch<AnyAction>) => {
    try {
      const { results } = await getMoviesWithParams(`trending/movie/day?page=${page}`);
      dispatch(
        setMoviesTrendList(
          results.sort((a: CardMovie, b: CardMovie) => b.vote_average - a.vote_average)
        )
      );
    } catch (error) {
      console.log(error);
    }
  };
export const getUpcomingMovies =
  (page: number = 1): any =>
  async (dispatch: Dispatch<AnyAction>) => {
    try {
      const { results } = await getMoviesWithParams(
        `/movie/upcoming?page=${page}&language=es-ES&region=ar`
      );
      dispatch(
        setMoviesUpcomingList(
          results.sort((a: CardMovie, b: CardMovie) => b.vote_average - a.vote_average)
        )
      );
    } catch (error) {
      console.log(error);
    }
  };
export const getSimilarMovies =
  (id: string): any =>
  async (dispatch: Dispatch<AnyAction>) => {
    try {
      const { results } = await getRequest(`movie/${id}/similar`);
      dispatch(setSimilarMovies(results));
    } catch (error) {
      console.log(error);
    }
  };
export const getRecommendationsMovies =
  (id: string): any =>
  async (dispatch: Dispatch<AnyAction>) => {
    try {
      const { results } = await getRequest(`movie/${id}/recommendations`);
      dispatch(setRecommendationsMovies(results));
    } catch (error) {
      console.log(error);
    }
  };

export const getReviewsMovies =
  (id: string): any =>
  async (dispatch: Dispatch<AnyAction>) => {
    try {
      const { results } = await getRequest(`/movie/${id}/reviews`);
      dispatch(setReviewsMovies(results));
    } catch (error) {
      console.log(error);
    }
  };
export const getVideoMovie =
  (idMovie: string): any =>
  async (dispatch: Dispatch<AnyAction>) => {
    try {
      const { results } = await getRequest(`movie/${idMovie}/videos`);
      const video = results.filter((video: { type: string }) => video.type.includes("Trailer"));

      const { items } = await getRequestVideoMovie(`videos?part=snippet&id=${video[0].key}`);
      const { id } = items[0];
      dispatch(setMovieVideo(id));
    } catch (error) {
      dispatch(setMovieVideo(undefined));
      console.log(error);
    }
  };
export const getImagesMovie =
  (idMovie: string): any =>
  async (dispatch: Dispatch<AnyAction>) => {
    try {
      const { backdrops } = await getImages(`/movie/${idMovie}/images`);

      dispatch(setMovieImages(backdrops));
    } catch (error) {
      console.log(error);
    }
  };
export const getDiscoverMovies = (): any => async (dispatch: Dispatch<AnyAction>) => {
  try {
    const { results } = await getRequest(`/discover/movie`);
    dispatch(setDiscoverMovies(results));
  } catch {}
};
