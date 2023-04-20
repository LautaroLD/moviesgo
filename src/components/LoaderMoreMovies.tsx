import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { DotPulse } from "@uiball/loaders";
type Props = {
  id?: string;
  callback: any;
  page: number;
  setPage: any;
};

export default function LoaderMoreMovies({ id, callback, page, setPage }: Props) {
  const myRef = useRef(null);
  const dispatch = useDispatch();
  const options = {
    threshold: 0.7,
    root: null
  };
  const observer = useRef(
    new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (id) {
            dispatch(callback(id, page));
          } else {
            dispatch(callback(page));
          }
          setPage(page++);
        }
      });
    }, options)
  );
  useEffect(() => {
    myRef.current && observer.current.observe(myRef.current);
  }, []);
  return (
    <div ref={myRef} className="loadMoreItems">
      <DotPulse size={40} speed={1.3} color="black" />
    </div>
  );
}
