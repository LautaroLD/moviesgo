import { BsStarFill } from "react-icons/bs";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, AppStore } from "../app/store";
import { CardMovie } from "../models/CardMovie";
import { addFavorite, deleteFavorite } from "../app/state/favoritesSlice";
import ErrorPng from "../assets/error.png";
type Props = {
  movie: CardMovie;
  index: number;
  section?: string;
};
export default function MovieCard({ movie, index, section }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((store: AppStore) => store.favorites.favList);
  const { id, title, poster_path, vote_average, release_date, name, first_air_date, media_type } =
    movie;

  const navigate = useNavigate();

  const addFavoriteMovie = (movie: CardMovie) => {
    dispatch(addFavorite(movie));
  };
  const removeFavoriteMovie = (movie: CardMovie) => {
    dispatch(deleteFavorite(movie));
  };
  const imgError = (event: any) => {
    event.target.src = ErrorPng;
    event.target.className = "imgError";
  };
  return (
    <section className="carousel__item">
      {section === "trends" && (
        <div className="trends__position">
          <p>#{index + 1}</p>
        </div>
      )}
      <img title={title} onError={imgError} src={`https://image.tmdb.org/t/p/w200${poster_path}`} />
      <section className="item__data">
        <p className="item__title">{title || name}</p>
        <p className="date">{release_date || first_air_date}</p>
        <p className="media">
          {media_type === "tv" && "serie"}
          {media_type === "movie" && "pelicula"}
        </p>
        <p className="votes">
          <BsStarFill /> {vote_average?.toFixed(1)}
        </p>
        <div className="item__icons-container">
          <span className="icon">
            <HiOutlineInformationCircle
              onClick={() => navigate(`/pelicula/${id}`)}
            ></HiOutlineInformationCircle>
          </span>
          <span className="favBtn icon">
            {favorites.findIndex(fav => fav.id === id) > -1 ? (
              <RiHeartFill onClick={() => removeFavoriteMovie(movie)} />
            ) : (
              <RiHeartLine onClick={() => addFavoriteMovie(movie)} />
            )}
          </span>
        </div>
      </section>
    </section>
  );
}
