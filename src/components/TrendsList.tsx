import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "../app/store";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";
import { getTrendMovies } from "../app/state/moviesSlice";
import { useEffect } from "react";
import TitleComponent from "./TitleComponent";

type Props = {};

export default function TrendsList({}: Props) {
  const moviesTrend = useSelector((store: AppStore) => store.movies.moviesTrend.list);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTrendMovies(1));
  }, []);
  return (
    <section className="trends">
      <div className="listHeader">
        <TitleComponent text="Tendencias" />
        <Link to={"./tendencias"} className="trends__moreBtn">
          Ver más
        </Link>
      </div>
      <Carousel movies={moviesTrend.slice(0, 10)} section="trends" />
    </section>
  );
}
