import Header from "./header";
import style from "../../styles/category.module.css";
import Link from "next/link";

export default function Spot() {
  return (
    <div>
      <Header />
      <section className={style.category}>
        <div class={style.top}>
          <h4>熱門主題</h4>
        </div>
        <div class={style.list}>
          <Link class={style.cat} href="/spot/search?cat=自然風景類">
            <img src="./Images/spot_cat1.jpg" alt="" />
            <p>自然風景類</p>
          </Link>
          <Link class={style.cat} href="/spot/search?cat=觀光工廠類">
            <img src="./Images/spot_cat2.jpg" alt="" />
            <p>觀光工廠類</p>
          </Link>
          <Link class={style.cat} href="/spot/search?cat=遊憩類">
            <img src="./Images/spot_cat3.jpg" alt="" />
            <p>遊憩類</p>
          </Link>
          <Link class={style.cat} href="/spot/search?cat=休閒農業類">
            <img src="./Images/spot_cat4.jpg" alt="" />
            <p>休閒農業類</p>
          </Link>
          <Link class={style.cat} href="/spot/search?cat=生態類">
            <img src="./Images/spot_cat5.jpg" alt="" />
            <p>生態類</p>
          </Link>
          <Link class={style.cat} href="/spot/search?cat=溫泉類">
            <img src="./Images/spot_cat6.jpg" alt="" />
            <p>溫泉類</p>
          </Link>
          <Link class={style.cat} href="/spot/search?cat=古蹟類">
            <img src="./Images/spot_cat7.jpg" alt="" />
            <p>古蹟類</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
