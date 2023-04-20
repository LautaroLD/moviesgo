import { useSelector } from "react-redux";
import { getTrendMovies } from "../app/state/moviesSlice";
import { AppStore } from "../app/store";
import LoaderMoreMovies from "../components/LoaderMoreMovies";
import MovieCard from "../components/MovieCard";
import { useState } from "react";
import TitleComponent from "../components/TitleComponent";
import ToTopBtn from "../components/ToTopBtn";

export default function Trends() {
  const moviesTrend = useSelector((store: AppStore) => store.movies.moviesTrend.list);

  const [page, setPage] = useState(moviesTrend.length ? 2 : 1);

  return (
    <main className="trendsPage">
      <TitleComponent text="Tendencias" />
      <section>
        {moviesTrend.map((movie, index) => (
          <MovieCard movie={movie} index={index} section="trends" key={`trends-${index}`} />
        ))}
      </section>
      <ToTopBtn />
      <LoaderMoreMovies callback={getTrendMovies} page={page} setPage={setPage} />
    </main>
  );
}
