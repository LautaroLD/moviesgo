import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Keyboard, Mousewheel, Navigation, Pagination } from "swiper";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import MovieCard from "./MovieCard";
import { CardMovie } from "../models/CardMovie";
type Props = {
  movies: CardMovie[];
  section?: string;
};
export default function Carousel({ movies, section }: Props) {
  return (
    <Swiper
      id="carousel"
      className="carousel"
      navigation={true}
      slidesPerView={"auto"}
      spaceBetween={10}
      modules={[Navigation, Pagination, Mousewheel, Keyboard, FreeMode]}
      wrapperClass={"wrapper"}
      freeMode={true}
    >
      {movies.map((movie: CardMovie, index: number) => (
        <SwiperSlide key={`trendMovie-${index}`}>
          <MovieCard movie={movie} index={index} section={section} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
