import TitleComponent from "./TitleComponent";
import { useSelector } from "react-redux";
import { AppStore } from "../app/store";
import Carousel from "./Carousel";
import { BsHeart } from "react-icons/bs";

type Props = {};

export default function FavoritesList({}: Props) {
  const favList = useSelector((store: AppStore) => store.favorites.favList);
  return (
    <section className="favList">
      <TitleComponent text="Mi lista" />
      {favList.length ? (
        <Carousel movies={favList} />
      ) : (
        <div className="favList__empty">
          <p>Tus favoritos apareceran aquí</p>
          <BsHeart />
        </div>
      )}
    </section>
  );
}
