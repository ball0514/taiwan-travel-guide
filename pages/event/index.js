import Header from "./header";
import style from "../../styles/category.module.css";
import Link from "next/link";

export default function Event() {
  return (
    <div>
      <Header />
      <section className={style.category}>
        <div className={style.top}>
          <h4>熱門主題</h4>
        </div>
        <div class={style.list}>
          <Link class={style.cat} href="/event/search?cat=節慶活動">
            <img src="/Images/event_cat1.jpg" alt="" />
            <p>節慶活動</p>
          </Link>
          <Link class={style.cat} href="/event/search?cat=自行車活動">
            <img src="/Images/event_cat2.jpg" alt="" />
            <p>自行車活動</p>
          </Link>
          <Link class={style.cat} href="/event/search?cat=遊憩活動">
            <img src="/Images/event_cat3.jpg" alt="" />
            <p>遊憩活動</p>
          </Link>
          <Link class={style.cat} href="/event/search?cat=產業文化活動">
            <img src="/Images/event_cat4.jpg" alt="" />
            <p>產業文化活動</p>
          </Link>
          <Link class={style.cat} href="/event/search?cat=年度活動">
            <img src="/Images/event_cat5.jpg" alt="" />
            <p>年度活動</p>
          </Link>
          <Link class={style.cat} href="/event/search?cat=四季活動">
            <img src="/Images/event_cat6.jpg" alt="" />
            <p>四季活動</p>
          </Link>
        </div>
      </section>
      ;
    </div>
  );
}
