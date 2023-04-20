import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "../app/store";
import TitleComponent from "./TitleComponent";
import Carousel from "./Carousel";
import { getDiscoverMovies } from "../app/state/moviesSlice";

type Props = {};

export default function DiscoverList({}: Props) {
  const discoverMovies = useSelector((store: AppStore) => store.movies.discoverMovie.list);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDiscoverMovies());
  }, []);

  return (
    <section>
      <TitleComponent text="Descubre" />
      {discoverMovies.length > 0 && <Carousel movies={discoverMovies} />}
    </section>
  );
}
