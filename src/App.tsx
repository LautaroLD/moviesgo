import { Suspense, lazy } from "react";
import Layout from "./utils/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
type Props = {};
import LoaderPage from "./pages/LoaderPage";
export default function App({}: Props) {
  const Home = lazy(() => import("./pages/HomePage"));
  const MoviePage = lazy(() => import("./pages/MoviePage"));
  const CategoryPage = lazy(() => import("./pages/CategoryPage"));
  const TrendsPage = lazy(() => import("./pages/TrendsPage"));
  const NotFound = lazy(() => import("./pages/NotFound"));
  const Item = lazy(() => import("./components/Item"));
  return (
    <Suspense fallback={<LoaderPage />}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pelicula" element={<MoviePage />}>
              <Route path=":slug" element={<Item />} />
            </Route>
            <Route path="/categoria" element={<CategoryPage />}>
              <Route path=":slug" element={<Item />} />
            </Route>
            <Route path="/tendencias" element={<TrendsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Suspense>
  );
}
