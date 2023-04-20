import { AnyAction, Dispatch, createSlice } from "@reduxjs/toolkit";
import { getRequest, getRequestVideoMovie } from "../../services/httpRequest";
import { Serie } from "../../models/Serie";
const initialSerie: Serie = {
  adult: false,
  backdrop_path: "",
  created_by: [],
  episode_run_time: [],
  first_air_date: "",
  genres: [],
  homepage: "",
  id: 0,
  in_production: false,
  languages: [],
  last_air_date: "",
  last_episode_to_air: {
    id: 0,
    name: "",
    overview: "",
    vote_average: 0,
    vote_count: 0,
    air_date: "",
    episode_number: 0,
    production_code: "",
    runtime: 0,
    season_number: 0,
    show_id: 0,
    still_path: ""
  },
  name: "",
  next_episode_to_air: null,
  networks: [],
  number_of_episodes: 0,
  number_of_seasons: 0,
  origin_country: [],
  original_language: "",
  original_name: "",
  overview: "",
  popularity: 0,
  poster_path: "",
  production_companies: [],
  production_countries: [],
  seasons: [],
  spoken_languages: [],
  status: "",
  tagline: "",
  type: "",
  vote_average: 0,
  vote_count: 0
};
export const TvSlice = createSlice({
  name: "serie",
  initialState: {
    tv: initialSerie,
    similarTv: {
      list: []
    },
    reviewTv: {
      list: []
    },
    videoTv: ""
  },
  reducers: {
    setTv: (state, action) => {
      state.tv = action.payload;
    },
    setSimilarTv: (state, action) => {
      state.similarTv.list = action.payload;
    },
    setReviewsTv: (state, action) => {
      state.reviewTv.list = action.payload;
    },
    setVideoTv: (state, action) => {
      action.payload
        ? (state.videoTv = `https://www.youtube.com/embed/${action.payload}`)
        : (state.videoTv = action.payload);
    }
  }
});
export const { setTv, setReviewsTv, setSimilarTv, setVideoTv } = TvSlice.actions;
export default TvSlice.reducer;
export const getTv =
  (id: string): any =>
  async (dispatch: Dispatch<AnyAction>) => {
    try {
      const results = await getRequest("tv/" + id);
      dispatch(setTv(results));
    } catch (error) {
      console.log(error);
    }
  };
export const getReviewsTv =
  (id: string): any =>
  async (dispatch: Dispatch<AnyAction>) => {
    try {
      const { results } = await getRequest(`/tv/${id}/reviews`);
      dispatch(setReviewsTv(results));
    } catch (error) {
      console.log(error);
    }
  };
export const getSimilarTv =
  (id: string): any =>
  async (dispatch: Dispatch<AnyAction>) => {
    try {
      const { results } = await getRequest(`tv/${id}/similar`);
      dispatch(setSimilarTv(results));
    } catch (error) {
      console.log(error);
    }
  };
export const getVideoTv =
  (idMovie: string): any =>
  async (dispatch: Dispatch<AnyAction>) => {
    try {
      const { results } = await getRequest(`tv/${idMovie}/videos`);
      const video = results.filter((video: { type: string }) => video.type.includes("Trailer"));

      const { items } = await getRequestVideoMovie(`videos?part=snippet&id=${video[0].key}`);
      const { id } = items[0];

      dispatch(setVideoTv(id));
    } catch (error) {
      dispatch(setVideoTv(undefined));
      console.log(error);
    }
  };
