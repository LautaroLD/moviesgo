import { configureStore } from "@reduxjs/toolkit";
import movies from "./state/moviesSlice";
import categories from "./state/categoriesSlice";
import favorites from "./state/favoritesSlice";
import serie from "./state/tvSlice";
import search from "./state/searchSlice";
import companies from "./state/companiesSlice";
import { Movie } from "../models/Movie";
import { CardMovie } from "../models/CardMovie";
import { Category } from "../models/Category";
import { Review } from "../models/Review";
import { Serie } from "../models/Serie";
import { Company } from "../models/Company";
import { Imagen } from "../models/Imagen";

export interface AppStore {
  movies: {
    movie: {
      item: Movie;
      video: string;
      images: Imagen[];
    };
    moviesByCategorySlice: {
      list: CardMovie[];
    };
    moviesTrend: {
      list: CardMovie[];
    };
    similarMovies: {
      list: CardMovie[];
    };
    recommendationsMovies: {
      list: CardMovie[];
    };
    reviewsMovie: {
      list: Array<Review>;
    };
    moviesUpcoming: {
      list: CardMovie[];
    };

    discoverMovie: {
      list: CardMovie[];
    };
  };
  categories: {
    list: Category[];
  };
  companies: {
    list: Company[];
  };
  favorites: {
    favList: Array<CardMovie>;
  };
  serie: {
    tv: Serie;
    reviewTv: {
      list: Array<Review>;
    };
    similarTv: {
      list: Array<CardMovie>;
    };
    videoTv: string;
  };
  search: {
    result: Array<CardMovie>;
  };
}
export type AppDispatch = typeof store.dispatch;
export const store = configureStore({
  reducer: {
    movies,
    categories,
    serie,
    companies,
    search,
    favorites
  }
});
