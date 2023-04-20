import CategoriesList from "../components/CategoriesList";
import DiscoverList from "../components/DiscoverList";
import FavoritesList from "../components/FavoritesList";
import TrendsList from "../components/TrendsList";
import UpcomingList from "../components/UpcomingList";

export default function Home() {
  return (
    <main className="home">
      <CategoriesList />
      <TrendsList />
      <FavoritesList />
      <DiscoverList />
      <UpcomingList />
    </main>
  );
}
