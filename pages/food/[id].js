import { useRouter } from "next/router";
import Link from "next/link";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import style from "../../styles/id.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";

export default function Page() {
  const router = useRouter();
  const [receivedData, setReceivedData] = useState(null);
  const [center, setCenter] = useState({ lat: "", lng: "" });
  const [city, setCity] = useState(null);
  const [more, setMore] = useState(null);
  const [number, setNumber] = useState(0);

  useEffect(() => {
    async function getData() {
      try {
        const receivedJsonData = router.query.food;
        const parsedData = await JSON.parse(receivedJsonData);
        setReceivedData(parsedData);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [router.query.food]);

  useEffect(() => {
    if (receivedData) {
      setCenter({
        lat: receivedData.Position.PositionLat,
        lng: receivedData.Position.PositionLon,
      });
    }
    const cityMapping = {
      臺北市: "Taipei",
      新北市: "NewTaipei",
      基隆市: "Keelung",
      宜蘭縣: "YilanCounty",
      桃園市: "Taoyuan",
      新竹縣: "HsinchuCounty",
      新竹市: "Hsinchu",
      苗栗縣: "MiaoliCounty",
      臺中市: "Taichung",
      彰化縣: "ChanghuaCounty",
      南投縣: "NantouCounty",
      雲林縣: "YunlinCounty",
      嘉義縣: "ChiayiCounty",
      嘉義市: "Chiayi",
      臺南市: "Tainan",
      高雄市: "Kaohsiung",
      屏東縣: "PingtungCounty",
      花蓮縣: "HualienCounty",
      臺東縣: "TaitungCounty",
      澎湖縣: "PenghuCounty",
      金門縣: "KinmenCounty",
      連江縣: "LienchiangCounty",
    };
    setCity(cityMapping[receivedData?.City]);
  }, [receivedData]);

  const containerStyle = {
    width: "100%",
    height: "360px",
    borderRadius: "12px",
  };

  useEffect(() => {
    setNumber(Math.floor(25 * Math.random()));
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
          }
        );
        // console.log(data.access_token);
        const { data: restaurant } = await axios.get(
          `https://tdx.transportdata.tw/api/basic/v2/Tourism/Restaurant/${city}?%24top=4&%24skip=${number}&%24format=JSON`,
          {
            headers: { authorization: `Bearer ${data.access_token}` },
          }
        );
        console.log(restaurant);
        setMore(restaurant);
      } catch (err) {
        console.log(err);
      }
    }
    if (city) {
      api();
    }
  }, [city, receivedData]);

  return (
    <div>
      {console.log(receivedData)}
      <nav className={style.nav}>
        <ol>
          <li>
            <Link href="/">首頁</Link>
          </li>
          <li>
            <Link href="/spot">/ 品嘗美食</Link>
          </li>
          <li>
            <Link href={`/food/search?city=${city}`}>
              / {receivedData?.City}
            </Link>
          </li>
          <li>/ {receivedData?.RestaurantName}</li>
        </ol>
      </nav>
      <main className={style.main}>
        <section className={style.banner}>
          <img
            src={
              receivedData?.Picture.PictureUrl1 ||
              "/images/NoImage-1100x400.svg"
            }
          />
        </section>
        <h4>{receivedData?.RestaurantName}</h4>
        <ol className={style.class}>
          {receivedData?.Class && <li># {receivedData.Class}</li>}
          {receivedData?.Class1 && <li># {receivedData.Class1}</li>}
          {receivedData?.Class2 && <li># {receivedData.Class2}</li>}
          {receivedData?.Class3 && <li># {receivedData.Class3}</li>}
        </ol>
        <section className={style.description}>
          <p className={style.title}>餐廳介紹：</p>
          <p>{receivedData?.Description || receivedData?.DescriptionDetail}</p>
        </section>
        <section className={style.detail}>
          <div className={style.info}>
            {receivedData?.OpenTime && (
              <p>
                <span>營業時間：</span>
                {receivedData.OpenTime}
              </p>
            )}
            {receivedData?.Phone && (
              <p>
                <span>聯絡電話：</span>
                {receivedData.Phone}
              </p>
            )}
            {receivedData?.Address && (
              <p>
                <span>餐廳地址：</span>
                {receivedData.Address}
              </p>
            )}
            {receivedData?.WebsiteUrl && (
              <p>
                <span>官方網站：</span>
                <Link href={receivedData.WebsiteUrl}>
                  {receivedData.WebsiteUrl}
                </Link>
              </p>
            )}
          </div>
          <section className={style.map}>
            <LoadScript googleMapsApiKey={process.env.googleAPIKey}>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}
              >
                <Marker position={center} />
              </GoogleMap>
            </LoadScript>
            <p>周邊資訊：</p>
            <div className={style.nearby}>
              <Link href="/spot" className={`${style.sort} ${style.spot}`}>
                <div>
                  {/* <img src="/Icon/nearby-scene30.svg" /> */}
                  <p>附近景點</p>
                </div>
              </Link>
              <Link href="/event" className={`${style.sort} ${style.event}`}>
                <div>
                  {/* <img src="/Icon/nearby-event30.svg" /> */}
                  <p>附近活動</p>
                </div>
              </Link>
              <Link href="/food" className={`${style.sort} ${style.food}`}>
                <div>
                  {/* <img src="/Icon/nearby-food30.svg" /> */}
                  <p>附近美食</p>
                </div>
              </Link>
            </div>
          </section>
        </section>
        <section className={style.more}>
          <div className={style.title}>
            <p>還有這些不能錯過的美食</p>
            <Link href={`/food/search?city=${city}`}>
              更多{receivedData?.City}美食
              <img src="/Icon/arrow-right16_R.svg" />
            </Link>
          </div>
          <div className={style.itemList}>
            {more?.map((food) => (
              <Link
                href={{
                  pathname: `/food/${food.RestaurantID}`,
                  query: { food: JSON.stringify(food) },
                }}
                key={food.RestaurantID}
                className={style.item}
              >
                <img
                  src={
                    food.Picture.PictureUrl1 || "/images/NoImage-255x200.svg"
                  }
                  className={style.picture}
                />
                <div className={style.description}>
                  <p>{food.RestaurantName}</p>
                  <img src="/Icon/spot16.svg" />
                  {food.City}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
