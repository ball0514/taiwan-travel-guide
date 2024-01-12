import style from "../../styles/sort.module.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Food() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    city: "",
    q: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = new URLSearchParams(formData).toString();
    // console.log(query);
    router.push(`/food/search?${query}`);
  };

  return (
    <div>
      <nav className={style.nav}>
        <ol>
          <li>
            <Link href="/">首頁</Link>
          </li>
          <li>/ 品嘗美食</li>
        </ol>
      </nav>
      <section className={style.form}>
        <form action="" onSubmit={handleSubmit}>
          <select
            name="city"
            id=""
            value={formData.city}
            onChange={handleChange}
          >
            <option value="">全部縣市</option>
            <option value="Taipei">臺北市</option>
            <option value="NewTaipei">新北市</option>
            <option value="Keelung">基隆市</option>
            <option value="YilanCounty">宜蘭縣</option>
            <option value="Taoyuan">桃園市</option>
            <option value="HsinchuCounty">新竹縣</option>
            <option value="Hsinchu">新竹市</option>
            <option value="MiaoliCounty">苗栗縣</option>
            <option value="Taichung">臺中市</option>
            <option value="ChanghuaCounty">彰化縣</option>
            <option value="NantouCounty">南投縣</option>
            <option value="YunlinCounty">雲林縣</option>
            <option value="ChiayiCounty">嘉義縣</option>
            <option value="Chiayi">嘉義市</option>
            <option value="Tainan">臺南市</option>
            <option value="Kaohsiung">高雄市</option>
            <option value="PingtungCounty">屏東縣</option>
            <option value="HualienCounty">花蓮縣</option>
            <option value="TaitungCounty">臺東縣</option>
            <option value="PenghuCounty">澎湖縣</option>
            <option value="KinmenCounty">金門縣</option>
            <option value="LienchiangCounty">連江縣</option>
          </select>
          <input
            type="text"
            placeholder="你想吃什麼？請輸入關鍵字"
            name="q"
            value={formData.q}
            onChange={handleChange}
          />
          <button>
            <img src="/Icon/search30.svg" />
            搜尋
          </button>
        </form>
      </section>
    </div>
  );
}
