import React from "react";
import { BsXCircle } from "react-icons/bs";

type Props = {};

export default function NotFound({}: Props) {
  return (
    <main className="notFound">
      <section>
        <h1>
          404 <BsXCircle />
        </h1>
        <h2>Pagina no encontrada</h2>
      </section>
    </main>
  );
}
