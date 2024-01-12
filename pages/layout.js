import Head from "next/head";
import Link from "next/link";
import style from "../styles/style.module.css";
import { useState } from "react";

export default function Layout({ children }) {
  const [menu, setMenu] = useState(false);

  const menuSwitch = () => {
    const menuBtn = document.querySelector("#menuButton");
    const bg = document.querySelector("#background");
    const selector = document.querySelector("#selector");

    if (!menu) {
      menuBtn
        .querySelector("img")
        .setAttribute("src", "./Icon/mobile-menu_close.svg");
      bg.classList.remove(style.hamburger);
      selector.classList.add(style.menuMove);
      setMenu(true);
    } else {
      menuBtn
        .querySelector("img")
        .setAttribute("src", "./Icon/mobile-menu_open.svg");
      bg.classList.add(style.hamburger);
      selector.classList.remove(style.menuMove);
      setMenu(false);
    }
  };

  return (
    <div>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/Icon/Logo.svg" />
        <title>台灣走走｜台灣旅遊景點導覽</title>
      </Head>
      <section className={style.computer}>
        <nav className={`${style.nav} ${style.computerNav}`}>
          <h1>台灣走走</h1>
          <Link href="/">
            <img src="/Icon/Logo-desktop.svg" alt="台灣走走" />
          </Link>
          <ul>
            <li>
              <Link href="/spot">探索景點</Link>
            </li>
            <li>
              <Link href="/event">節慶活動</Link>
            </li>
            <li>
              <Link href="/food">品嘗美食</Link>
            </li>
          </ul>
        </nav>
      </section>
      <section className={style.mobile}>
        <nav className={`${style.nav} ${style.mobileNav}`}>
          <h1>台灣走走</h1>
          <Link href="/">
            <img src="/Icon/Logo-mobile.svg" alt="台灣走走" />
          </Link>
        </nav>
        <div
          className={`${style.mobileMenu} ${style.hamburger}`}
          id="background"
        >
          <div className={style.selector} id="selector">
            <Link href="/" onClick={menuSwitch}>
              <img src="/Icon/Logo-mobile.svg" alt="台灣走走" />
            </Link>
            <ul>
              <li>
                <Link href="/spot" onClick={menuSwitch}>
                  探索景點
                </Link>
              </li>
              <hr></hr>
              <li>
                <Link href="/event" onClick={menuSwitch}>
                  節慶活動
                </Link>
              </li>
              <hr></hr>
              <li>
                <Link href="/food" onClick={menuSwitch}>
                  品嘗美食
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <button className={style.button} id="menuButton" onClick={menuSwitch}>
          <img src="./Icon/mobile-menu_open.svg" />
        </button>
      </section>
      <main className={style.main}>{children}</main>
      <footer className={style.footer}>
        <p>
          THE F2E 3rd week01 © UI/UX Designer：Breakfast｜Code Engineer：
          Yu-Hsuan, CHIU
        </p>
      </footer>
    </div>
  );
}
