import { useEffect } from "react";
import TitleComponent from "./TitleComponent";
import Carousel from "./Carousel";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "../app/store";
import { getUpcomingMovies } from "../app/state/moviesSlice";

export default function UpcomingList() {
  const upcomingList = useSelector((store: AppStore) => store.movies.moviesUpcoming.list);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUpcomingMovies(1));
  }, []);
  return (
    <section>
      <TitleComponent text="Proximamente" />
      <Carousel movies={upcomingList} />
    </section>
  );
}
