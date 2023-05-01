import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "../app/store";
import TitleComponent from "./TitleComponent";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getCategories } from "../app/state/categoriesSlice";

export default function Footer() {
  const categories = useSelector((store: AppStore) => store.categories.list);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <footer className="footer">
      <section className="categories-section">
        <TitleComponent text="Categorías" />
        <div className="categories-list">
          {categories?.map((category, index) => (
            <Link
              key={`footer-category-${index}`}
              to={`./categoria/${category.name}-${category.id}`}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </section>
    </footer>
  );
}
