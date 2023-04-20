import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation, useParams } from "react-router-dom";
import {
  getImagesMovie,
  getMovie,
  getRecommendationsMovies,
  getReviewsMovies,
  getSimilarMovies,
  getVideoMovie
} from "../app/state/moviesSlice";
export default function MoviePage() {
  const { slug } = useParams();
  const { pathname } = useLocation();

  const dispatch = useDispatch();
  useEffect(() => {
    slug &&
      (dispatch(getMovie(slug)),
      dispatch(getSimilarMovies(slug)),
      dispatch(getRecommendationsMovies(slug)),
      dispatch(getReviewsMovies(slug)),
      dispatch(getImagesMovie(slug)));
  }, [slug]);
  useEffect(() => {
    slug && dispatch(getVideoMovie(slug));
  }, [pathname]);

  return (
    <main>
      <Outlet />
    </main>
  );
}
