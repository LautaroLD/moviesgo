import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FreeMode, Keyboard, Mousewheel, Navigation, Pagination } from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import { AppStore } from "../app/store";
import { getCategories } from "../app/state/categoriesSlice";
export default function CategoriesList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categories = useSelector((store: AppStore) => store.categories.list);
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <section>
      <Swiper
        className="categories"
        id="categories"
        navigation={true}
        slidesPerView={"auto"}
        spaceBetween={20}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard, FreeMode]}
        setWrapperSize={true}
        wrapperClass={"wrapper"}
        freeMode={true}
      >
        {categories?.map(category => (
          <SwiperSlide
            className="category"
            key={`categoty-item-${category.id}`}
            onClick={() => navigate(`./categoria/${category.name}-${category.id}`)}
          >
            {category.name}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
