import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

export default function useObserver(
  options: { threshold: number; root: null },
  callback: any,
  id?: string
) {
  const dispatch = useDispatch();

  let page = 1;
  const [elements, setElements] = useState([]);
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);
  const observer = useRef(
    new IntersectionObserver(observerEntries => {
      observerEntries.forEach(item => {
        item.isIntersecting && dispatch(callback(id, page));
        page++;
      });
      setEntries(observerEntries);
    }, options)
  );
  useEffect(() => {
    const currentObserver = observer.current;
    currentObserver.disconnect();
    elements.length > 0 && elements.forEach(element => currentObserver.observe(element));

    return () => {
      currentObserver && currentObserver.disconnect();
    };
  }, [elements]);
  return [observer.current, setElements, entries];
}
