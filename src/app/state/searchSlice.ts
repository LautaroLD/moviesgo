import { AnyAction, Dispatch, createSlice } from "@reduxjs/toolkit";
import { CardMovie } from "../../models/CardMovie";
import { getMoviesWithParams } from "../../services/httpRequest";

const initialList: Array<CardMovie> = [];
export const SearchSlice = createSlice({
  name: "search",
  initialState: {
    result: initialList
  },
  reducers: {
    setResults(state, action) {
      state.result = action.payload;
    }
  }
});
export const { setResults } = SearchSlice.actions;
export default SearchSlice.reducer;
export const getResults =
  (end: string): any =>
  async (dispatch: Dispatch<AnyAction>) => {
    try {
      const { results } = await getMoviesWithParams(`/search/movie?query=${end}`);
      dispatch(setResults(results));
    } catch {}
  };
