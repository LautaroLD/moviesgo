import { BsFillStarFill, BsHeartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppStore } from "../app/store";
import { CardMovie } from "../models/CardMovie";
import { Movie } from "../models/Movie";
import Carousel from "./Carousel";
import { addFavorite, deleteFavorite } from "../app/state/favoritesSlice";
import TitleComponent from "./TitleComponent";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
export default function Item() {
  const movie = useSelector((store: AppStore) => store.movies.movie.item);
  const images = useSelector((store: AppStore) => store.movies.movie.images);
  const favorites = useSelector((store: AppStore) => store.favorites.favList);
  const similarMovies = useSelector((store: AppStore) => store.movies.similarMovies.list);
  const recommendationsMovies = useSelector(
    (store: AppStore) => store.movies.recommendationsMovies.list
  );
  const movieVideo = useSelector((store: AppStore) => store.movies.movie.video);
  const { id, title, tagline, overview, genres, poster_path, vote_average, release_date } = movie;
  const dispatch = useDispatch();
  const addFavoriteMovie = (movie: CardMovie | Movie) => {
    dispatch(addFavorite(movie));
  };
  const removeFavoriteMovie = (movie: CardMovie | Movie) => {
    dispatch(deleteFavorite(movie));
  };

  return (
    <section className="movie">
      <div className="header-movie">
        <p className="title">{title}</p>
      </div>
      <img
        className="movie__img"
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        title="movie"
        alt={title}
      />
      <div className="movie__content">
        {movieVideo.length > 0 && (
          <div className="movie__video-container">
            <TitleComponent text="Trailer" />
            <iframe
              className="video"
              src={movieVideo}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        )}
        {tagline && <p className="tagline">{tagline}</p>}
        <div className="data">
          <p>
            <BsFillStarFill className="star-icon" />
            {vote_average?.toFixed(1)}
          </p>
          <p>{release_date}</p>
        </div>
        <p className="overview">{overview}</p>
        <div className="categories-container">
          {genres?.map(category => (
            <Link
              className="category-item"
              key={`categoty-item-${category.id}`}
              to={`${location.origin}/categoria/${category.name}-${category.id}`}
            >
              {category.name}
            </Link>
          ))}
        </div>
        <div className="favBtn-container">
          {favorites.findIndex(fav => fav.id === id) > -1 ? (
            <button className="btnFav btnIsFav" onClick={() => removeFavoriteMovie(movie)}>
              Remover de Mi lista
              <BsHeartFill className="favMovieIcon iconInFav" />
            </button>
          ) : (
            <button className="btnFav btnNotFav" onClick={() => addFavoriteMovie(movie)}>
              Agregar a Mi lista
              <BsHeartFill className="favMovieIcon" />
            </button>
          )}
        </div>
      </div>
      <div className="movie__images-contanier">
        <Swiper spaceBetween={10}>
          {images.map((image, index) => (
            <SwiperSlide key={`imagesList-${index}`}>
              <img src={`https://image.tmdb.org/t/p/w200${image.file_path}`} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {similarMovies.length > 0 && (
        <div className="movie__carousel-container">
          <TitleComponent text="Similares" />
          <Carousel movies={similarMovies} />
        </div>
      )}
      {recommendationsMovies.length > 0 && (
        <div className="movie__carousel-container">
          <TitleComponent text="Recomendaciones" />
          <Carousel movies={recommendationsMovies} />
        </div>
      )}
    </section>
  );
}
