import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/icons/logo.svg";
import { useDispatch } from "react-redux";
import { getResults } from "../app/state/searchSlice";
export default function Header() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  useEffect(() => {
    dispatch(getResults(input));
  }, [input]);
  useEffect(() => {
    setInput("");
  }, [pathname]);
  return (
    <header className="header">
      <Link reloadDocument={true} to={"/"} className="logo">
        <img src={Logo} alt="Logo" width={35} />
      </Link>
      <form className="form">
        <input
          required
          className="form__input"
          type="search"
          placeholder="Buscar..."
          value={input}
          onChange={event => setInput(event.target.value)}
        />
      </form>
    </header>
  );
}
