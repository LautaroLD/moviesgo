import { AnyAction, Dispatch, createSlice } from "@reduxjs/toolkit";
import { CardMovie } from "../../models/CardMovie";
import { Movie } from "../../models/Movie";
export const initialList: Array<CardMovie> = [];
export const FavoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favList: localStorage.favorites ? JSON.parse(localStorage.favorites) : initialList
  },
  reducers: {
    updateFavoriteList: (state, action) => {
      state.favList.push(action.payload);
      localStorage.setItem("favorites", JSON.stringify(state.favList));
    },
    removeFavoriteList: (state, action) => {
      const index = state.favList.findIndex((movie: { id: any }) => movie.id === action.payload.id);
      state.favList.splice(index, 1);
      localStorage.setItem("favorites", JSON.stringify(state.favList));
    }
  }
});
export const { removeFavoriteList, updateFavoriteList } = FavoritesSlice.actions;
export default FavoritesSlice.reducer;

export const addFavorite =
  (movie: CardMovie | Movie): any =>
  (dispatch: Dispatch<AnyAction>) =>
    dispatch(updateFavoriteList(movie));

export const deleteFavorite =
  (movie: CardMovie | Movie): any =>
  (dispatch: Dispatch<AnyAction>) =>
    dispatch(removeFavoriteList(movie));
