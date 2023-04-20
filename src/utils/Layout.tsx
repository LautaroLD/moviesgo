import { useSelector } from "react-redux";
import { AppStore } from "../app/store";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../components/Footer";
type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  const searchResults = useSelector((store: AppStore) => store.search.result);
  const navigate = useNavigate();

  const path = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);
  return (
    <>
      <Header />
      {searchResults.length > 0 && (
        <div className="result-container">
          {searchResults.map((movie, index) => (
            <div onClick={() => navigate(`/pelicula/${movie.id}`)} className="result-item">
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.backdrop_path ?? movie.poster_path}`}
                alt=""
              />
              <div>
                <p className="result-title">{movie.title}</p>
                <p className="result-date">{movie.release_date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {children}
      <Footer />
    </>
  );
}
