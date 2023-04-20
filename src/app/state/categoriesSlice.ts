import { AnyAction, Dispatch, createSlice } from "@reduxjs/toolkit";
import { Category } from "../../models/Category";
import { getRequest } from "../../services/httpRequest";

export const initialList: Array<Category> = [];

export const CategoriesSlice = createSlice({
  name: "categories",
  initialState: {
    list: initialList
  },
  reducers: {
    setCategories: (state, action) => {
      state.list = action.payload;
    }
  }
});

export const { setCategories } = CategoriesSlice.actions;

export default CategoriesSlice.reducer;

export const getCategories = (): any => async (dispatch: Dispatch<AnyAction>) => {
  try {
    const results = await getRequest("genre/movie/list");
    dispatch(setCategories(results.genres));
  } catch (error) {
    console.log(error);
  }
};
