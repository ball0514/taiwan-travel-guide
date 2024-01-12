import Header from "./header";
import style from "../../styles/category.module.css";
import Link from "next/link";

export default function Food() {
  return (
    <div>
      <Header />
      <section className={style.category}>
        <div class={style.top}>
          <h4>熱門分類</h4>
        </div>
        <div class={style.list}>
          <Link class={style.cat} href="/food/search?cat=地方特產">
            <img src="./Images/food_cat1.jpg" alt="" />
            <p>地方特產</p>
          </Link>
          <Link class={style.cat} href="/food/search?cat=中式美食">
            <img src="./Images/food_cat2.jpg" alt="" />
            <p>中式美食</p>
          </Link>
          <Link class={style.cat} href="/food/search?cat=甜點冰品">
            <img src="./Images/food_cat3.jpg" alt="" />
            <p>甜點冰品</p>
          </Link>
          <Link class={style.cat} href="/food/search?cat=異國料理">
            <img src="./Images/food_cat4.jpg" alt="" />
            <p>異國料理</p>
          </Link>
          <Link class={style.cat} href="/food/search?cat=伴手禮">
            <img src="./Images/food_cat5.jpg" alt="" />
            <p>伴手禮</p>
          </Link>
          <Link class={style.cat} href="/food/search?cat=素食">
            <img src="./Images/food_cat6.jpg" alt="" />
            <p>素食</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
