import { useState } from "react";
import TitleComponent from "../components/TitleComponent";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getMovieByCategory } from "../app/state/moviesSlice";
import { AppStore } from "../app/store";
import MovieCard from "../components/MovieCard";
import LoaderMoreMovies from "../components/LoaderMoreMovies";
import ToTopBtn from "../components/ToTopBtn";

type Props = {};

export default function CategoryPage({}: Props) {
  const [page, setPage] = useState(1);

  const movies = useSelector((store: AppStore) => store.movies.moviesByCategorySlice.list);

  const { slug } = useParams();
  return (
    <main className="categoryPage">
      <TitleComponent text={slug?.split("-")[0]} />
      <section className="">
        {movies.map((movie, index) => (
          <MovieCard movie={movie} index={index} key={`categoryPage-item-${index}`} />
        ))}
      </section>
      <ToTopBtn />
      <LoaderMoreMovies
        callback={getMovieByCategory}
        id={slug?.split("-")[1]}
        page={page}
        setPage={setPage}
      />
    </main>
  );
}
