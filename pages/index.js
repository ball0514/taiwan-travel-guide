import style from "../styles/index.module.css";
import Link from "next/link";
import axios from "axios";
import qs from "qs";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// export async function getStaticProps() {
//   try {
//     const parameter = {
//       grant_type: "client_credentials",
//       client_id: process.env.client_id,
//       client_secret: process.env.client_secret,
//     };

//     const { data } = await axios.post(
//       "https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token",
//       qs.stringify(parameter),
//       {
//         headers: { "content-type": "application/x-www-form-urlencoded" },
//       }
//     );

//     // console.log(data.access_token);

//     const { data: activity } = await axios.get(
//       "https://tdx.transportdata.tw/api/basic/v2/Tourism/Activity?%24top=4&%24skip=100&%24format=JSON",
//       {
//         headers: { authorization: `Bearer ${data.access_token}` },
//       }
//     );
//     // console.log(activity);

//     const { data: scenicSpots } = await axios.get(
//       "https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot?%24top=4&%24skip=100&%24format=JSON",
//       {
//         headers: { authorization: `Bearer ${data.access_token}` },
//       }
//     );
//     // console.log(scenicSpots);

//     const { data: restaurant } = await axios.get(
//       "https://tdx.transportdata.tw/api/basic/v2/Tourism/Restaurant?%24top=4&%24skip=100&%24format=JSON",
//       {
//         headers: { authorization: `Bearer ${data.access_token}` },
//       }
//     );
//     // console.log(restaurant);

//     return {
//       props: {
//         activity,
//         scenicSpots,
//         restaurant,
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return {
//       props: {
//         data: null,
//       },
//     };
//   }
// }
// { activity, scenicSpots, restaurant }
export default function Home() {
  const [activity, setActivity] = useState(null);
  const [scenicSpots, setScenicSpots] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [carousel, setCarousel] = useState(null);
  const [number, setNumber] = useState(50);

  useEffect(() => {
    setNumber(Math.floor(200 * Math.random()));
  }, []);

  useEffect(() => {
    async function api() {
      try {
        const parameter = {
          grant_type: "client_credentials",
          client_id: process.env.client_id,
          client_secret: process.env.client_secret,
        };

        const { data } = await axios.post(
          "https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token",
          qs.stringify(parameter),
          {
            headers: { "content-type": "application/x-www-form-urlencoded" },
          },
        );

        // console.log(data.access_token);

        const {
          data: { value: activity },
        } = await axios.get(
          `https://tdx.transportdata.tw/api/tourism/service/odata/V2/Tourism/Event?%24top=4&%24skip=${number}`,
          {
            headers: { authorization: `Bearer ${data.access_token}` },
          },
        );
        setActivity(activity);
        // console.log(activity);

        const {
          data: { value: scenicSpots },
        } = await axios.get(
          `https://tdx.transportdata.tw/api/tourism/service/odata/V2/Tourism/Attraction?%24top=4&%24skip=${number}`,
          {
            headers: { authorization: `Bearer ${data.access_token}` },
          },
        );
        setScenicSpots(scenicSpots);
        // console.log(scenicSpots);

        const {
          data: { value: restaurant },
        } = await axios.get(
          `https://tdx.transportdata.tw/api/tourism/service/odata/V2/Tourism/Restaurant?%24top=4&%24skip=${number}`,
          {
            headers: { authorization: `Bearer ${data.access_token}` },
          },
        );
        setRestaurant(restaurant);
        // console.log(restaurant);

        const carouselCity = [
          // "Taipei",
          // "NewTaipei",
          // "Taichung",
          // // "Tainan",
          // "Kaohsiung",
          // "YilanCounty",
          // "HualienCounty",
          // // "TaitungCounty",
          "臺北市",
          "新北市",
          // "臺中市",
          // "臺南市",
          // "高雄市",
          // "宜蘭縣",
          // "花蓮縣",
          // "臺東縣",
        ];
        const carouselData = async (city) => {
          const {
            data: { value: carouselObj },
          } = await axios.get(
            `https://tdx.transportdata.tw/api/tourism/service/odata/V2/Tourism/Attraction`,
            {
              headers: { authorization: `Bearer ${data.access_token}` },
              params: {
                $top: 1,
                $skip: 130,
                $filter: `PostalAddress/City eq '${city}'`,
              },
            },
          );
          return carouselObj[0];
        };

        const fetchAllData = async () => {
          const promises = carouselCity.map(carouselData);
          const results = await Promise.all(promises);
          setCarousel(results);
        };
        // fetchAllData();
        // console.log(carousel);
      } catch (err) {
        console.log(err);
      }
    }
    api();
  }, [number]);

  const router = useRouter();
  const [formData, setFormData] = useState({ select: "spot", q: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const query = new URLSearchParams(formData).toString();
    if (formData.select === "spot") {
      router.push(`/spot/search${query ? `?${query}` : ""}`);
    } else if (formData.select === "event") {
      router.push(`/event/search${query ? `?${query}` : ""}`);
    } else if (formData.select === "food") {
      router.push(`/food/search${query ? `?${query}` : ""}`);
    }
  };

  const [page, setPage] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (page == 5) {
        setPage(0);
      } else {
        setPage((prevCount) => prevCount + 1);
      }
    }, 3000);
    const carouselItem = document.querySelectorAll("#carousel");
    carouselItem.forEach((item, index) => {
      if (index !== page) {
        item.classList.add(style.hidden);
      } else {
        item.classList.remove(style.hidden);
      }
    });
    const btn = document.querySelectorAll("#btn");
    btn.forEach((btn, index) => {
      if (index === page) {
        btn.classList.add(style.selected);
      } else {
        btn.classList.remove(style.selected);
      }
    });
    return () => clearInterval(intervalId);
  }, [page]);

  const next = () => {
    if (page == 5) {
      setPage(0);
    } else {
      setPage(page + 1);
    }
  };

  const previous = () => {
    if (page == 0) {
      setPage(5);
    } else {
      setPage(page - 1);
    }
  };

  const navBtn = (number) => {
    setPage(number);
  };

  return (
    <div>
      <section className={style.banner}>
        <div className={style.text}>
          <h2>
            探索<span>台灣之美</span>
            <br />
            讓我們更親近這片土地
          </h2>
          <p>
            <img src="/Icon/spot24_Y.svg" alt="" />
            台灣旅遊景點導覽 Taiwan Travel Guide
          </p>
        </div>
        <div className={style.search}>
          <form action="" onSubmit={handleSubmit}>
            <select
              name="select"
              value={formData.select}
              onChange={handleChange}
            >
              <option value="spot">探索景點</option>
              <option value="event">節慶活動</option>
              <option value="food">品嘗美食</option>
            </select>
            <input
              type="text"
              placeholder="你想去哪裡？請輸入關鍵字"
              name="q"
              value={formData.q}
              onChange={handleChange}
            />
            <button>
              <img src="/Icon/search30.svg" />
              搜尋
            </button>
          </form>
        </div>
      </section>
      <main className={style.main}>
        {/* <section className={style.slider}>
          {carousel?.map((item, index) => (
            <div
              key={index}
              id="carousel"
              className={`${style.carouselItem} ${
                index !== page ? style.hidden : ""
              }`}
            >
              <Link
                href={{
                  pathname: `/spot/${item.AttractionID}`,
                  query: { spot: JSON.stringify(item) },
                }}
              >
                <img
                  src={item.Images[0]?.URL || "/Images/NoImage-1100x400.svg"}
                  alt={item.Images[0]?.Name}
                />
                <p>
                  {item.PostalAddress.City} | {item.AttractionName}
                </p>
              </Link>
            </div>
          ))}
          <div className={style.control}>
          <button
            className={`${style.arrow} ${style.arrowLeft}`}
            onClick={previous}
          ></button>
          <button
            className={`${style.arrow} ${style.arrowRight}`}
            onClick={next}
          ></button>
          <div className={style.pagination}>
            {carousel?.map((item, index) => (
              <button
                className={`${style.btn} ${
                  index === page ? style.selected : ""
                }`}
                id="btn"
                key={index}
                onClick={() => navBtn(index)}
              ></button>
            ))}
          </div>
          </div>
        </section> */}
        <section className={style.more}>
          <div className={style.sort}>
            <h4>近期活動</h4>
            <Link href="/event/search">
              查看更多活動
              <img src="/Icon/arrow-right16_R.svg" />
            </Link>
          </div>
          <div className={style.bigInfo}>
            {activity?.slice(activity.length - 4).map((event) => (
              <div key={event.EventID}>
                <Link
                  href={{
                    pathname: `/event/${event.EventID}`,
                    query: { event: JSON.stringify(event) },
                  }}
                >
                  <img
                    src={event.Images[0]?.URL || "/images/NoImage-160x160.svg"}
                    alt={event.Images[0]?.Name}
                  />
                  <div className={style.description}>
                    <p className={style.date}>{`${event.StartDateTime.slice(
                      0,
                      10,
                    )} - ${event.EndDateTime.slice(0, 10)}`}</p>
                    <p className={style.title}>{event.EventName}</p>
                    <div className={style.city}>
                      <img src="/Icon/spot16.svg" />
                      {event.PostalAddress.City}
                    </div>
                    <div href="/" className={style.detail}>
                      詳細介紹
                      <img src="/Icon/arrow-right16_G.svg" />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
        <section className={style.more}>
          <div className={style.sort}>
            <h4>熱門打卡景點</h4>
            <Link href="/spot/search">
              查看更多景點
              <img src="/Icon/arrow-right16_R.svg" />
            </Link>
          </div>
          <div className={style.smallInfo}>
            {scenicSpots?.slice(scenicSpots.length - 4).map((spot) => (
              <div key={spot.AttractionID}>
                <Link
                  href={{
                    pathname: `/spot/${spot.AttractionID}`,
                    query: { spot: JSON.stringify(spot) },
                  }}
                >
                  <img
                    src={spot.Images[0]?.URL || "/images/NoImage-255x200.svg"}
                    alt={spot.Images[0]?.Name}
                  />
                  <div className={style.content}>
                    <p>{spot.AttractionName}</p>
                    <img src="/Icon/spot16.svg" />
                    {spot.PostalAddress.City}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
        <section className={style.more}>
          <div className={style.sort}>
            <h4>一再回訪美食</h4>
            <Link href="/food/search">
              查看更多美食
              <img src="/Icon/arrow-right16_R.svg" />
            </Link>
          </div>
          <div className={style.smallInfo}>
            {restaurant?.slice(restaurant.length - 4).map((food) => (
              <div key={food.RestaurantID}>
                <Link
                  href={{
                    pathname: `/food/${food.RestaurantID}`,
                    query: { food: JSON.stringify(food) },
                  }}
                >
                  <img
                    src={food.Images[0]?.URL || "/images/NoImage-255x200.svg"}
                    alt={food.Images[0]?.Name}
                  />
                  <div className={style.content}>
                    <p>{food.RestaurantName}</p>
                    <img src="/Icon/spot16.svg" />
                    {food.PostalAddress.City}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
