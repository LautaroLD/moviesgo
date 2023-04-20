import { useSelector } from "react-redux";
import { AppStore } from "../app/store";
import TitleComponent from "./TitleComponent";
import { Link } from "react-router-dom";

type Props = {};

export default function Footer({}: Props) {
  const categories = useSelector((store: AppStore) => store.categories.list);
  return (
    <footer className="footer">
      <section className="categories-section">
        <TitleComponent text="Categorias" />
        <div className="categories-list">
          {categories.map((category, index) => (
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
