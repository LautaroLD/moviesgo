import { useEffect, useState } from "react";
import { BsArrowUpCircle } from "react-icons/bs";

type Props = {};

export default function ToTopBtn({}: Props) {
  const [position, setposition] = useState(0);
  const toTop = () => {
    window.scrollTo({
      top: 0
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setposition(window.scrollY);
    });
  }, []);

  return (
    <div hidden={position < 500} className="toTopBtn" onClick={toTop}>
      <BsArrowUpCircle />
    </div>
  );
}
