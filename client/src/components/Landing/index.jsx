import React from "react";
import { Link } from "react-router-dom";
import s from "./landing.module.css";

export default function Landing() {
  return (
    <div className={s.mainWrapper}>
      <div className={s.blur}>
        <section className={s.contentWrapper}>
          <h1 className={s.title}>Welcome!</h1>
          <h2 className={s.subtitle}>
            Let's help you find the perfect recipe to fix a delicious dish!
          </h2>
          <Link to="/home">
            <button className={s.button}>Get Started</button>
          </Link>
        </section>
      </div>
    </div>
  );
}
