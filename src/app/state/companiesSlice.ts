import { AnyAction, Dispatch, createSlice } from "@reduxjs/toolkit";
import { getRequest } from "../../services/httpRequest";
import { Company } from "../../models/Company";

export const initialList: Array<Company> = [];

export const CompaniesSlice = createSlice({
  name: "companies",
  initialState: {
    list: initialList
  },
  reducers: {
    setCompanies: (state, action) => {
      state.list = action.payload;
    }
  }
});

export const { setCompanies } = CompaniesSlice.actions;

export default CompaniesSlice.reducer;

export const getCompanies = (): any => async (dispatch: Dispatch<AnyAction>) => {
  try {
    const { results } = await getRequest("/search/company");
    dispatch(setCompanies(results));
  } catch (error) {
    console.log(error);
  }
};
