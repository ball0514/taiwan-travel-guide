import { useRouter } from "next/router";
import axios from "axios";
import qs from "qs";
import React, { useState, useEffect } from "react";
import style from "../../styles/search.module.css";
import Link from "next/link";
import Spot from "./header";

export default function Search() {
  const router = useRouter();
  let { city, q, cat } = router.query;
  let content = [];
  const [formData, setFormData] = useState(null);
  const [render, setRender] = useState(false);
  let array = [];
  const [page, setPage] = useState(1);

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

        const filterConditions = [];

        if (city) {
          filterConditions.push(`PostalAddress/City eq '${city}'`);
        }

        if (q) {
          filterConditions.push(`contains(AttractionName, '${q}')`);
        }

        if (cat) {
          filterConditions.push(`contains(Class1, '${cat}')`);
        }

        // 用 ' and ' 把所有條件串起來
        // 組合後會變成: "PostalAddress/City eq '臺北市' and contains(ScenicSpotName, '公園')"
        const finalFilter = filterConditions.join(" and ");

        const payload = {
          headers: { authorization: `Bearer ${data.access_token}` },
        };

        if (filterConditions.length > 0) {
          payload.params = {
            $filter: finalFilter,
          };
        }

        const {
          data: { value: restaurant },
        } = await axios.get(
          `https://tdx.transportdata.tw/api/tourism/service/odata/V2/Tourism/Restaurant`,
          payload,
        );
        console.log(restaurant);

        restaurant.map((restaurant) => {
          content.unshift(restaurant);
        });
        let page = content.length / 20;
        let i = 0;
        while (i < page) {
          array.push(content.slice(i * 20, (i + 1) * 20));
          i++;
        }
        let j = 1;
        array.forEach((array) => {
          array.id = j;
          j++;
        });

        setFormData(array);
        setRender(content);
        console.log(content);
      } catch (err) {
        setRender([]);
        console.log(err);
      }
    }
    api();
  }, [city, q, cat]);

  const Page = (number) => {
    setPage(number);
  };

  const prePage = () => {
    if (page != 1) {
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    if (page != formData.length) {
      setPage(page + 1);
    }
  };

  return (
    <div>
      <Spot />
      <section className={style.result}>
        {render.length !== 0 ? (
          <div>
            <div className={style.title}>
              <h4>搜尋結果</h4>
              <p>
                共有<span>{render.length}</span>筆
              </p>
            </div>
            <div className={style.itemList}>
              {formData?.[page - 1].map((food) => (
                <Link
                  href={{
                    pathname: `/food/${food.RestaurantID}`,
                    query: { food: JSON.stringify(food) },
                  }}
                  key={food.RestaurantID}
                  className={style.item}
                >
                  <img
                    src={food.Images[0]?.URL || "/images/NoImage-255x200.svg"}
                    alt={food.Images[0]?.Name}
                    className={style.picture}
                  />
                  <div className={style.description}>
                    <p>{food.RestaurantName}</p>
                    <img src="/Icon/spot16.svg" />
                    {food.PostalAddress.City}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className={style.title}>
              <h4>搜尋結果</h4>
              <p>
                共有<span>0</span>筆
              </p>
            </div>
            <div className={style.noList}>
              <div>
                <img src="/Images/nofound80.svg" />
              </div>
              <p>
                目前查無資料
                <br />
                請重新搜尋
              </p>
            </div>
          </div>
        )}

        {render && formData?.length > 1 && (
          <div className={style.page}>
            {page != 1 && (
              <Link
                href="#"
                onClick={prePage}
                className={`${style.btn} ${style.btnArrow}`}
              >
                <img src="/Icon/arrow-left24_G.svg" />
              </Link>
            )}
            {formData.length <= 4 && (
              <div className={style.numberArea}>
                {formData.slice(0, 4).map((number) => (
                  <div key={number.id}>
                    {number.id == page ? (
                      <Link
                        href="#"
                        onClick={() => Page(number.id)}
                        className={`${style.btn} ${style.btnNumber} ${style.btnCurrent}`}
                      >
                        {number.id}
                      </Link>
                    ) : (
                      <Link
                        href="#"
                        onClick={() => Page(number.id)}
                        className={`${style.btn} ${style.btnNumber} ${style.btnOther}`}
                      >
                        {number.id}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            )}
            {formData.length > 4 && (
              <div>
                {page <= 3 && (
                  <div className={style.numberArea}>
                    {formData.slice(0, 4).map((number) => (
                      <div key={number.id}>
                        {number.id == page ? (
                          <Link
                            href="#"
                            onClick={() => Page(number.id)}
                            className={`${style.btn} ${style.btnNumber} ${style.btnCurrent}`}
                          >
                            {number.id}
                          </Link>
                        ) : (
                          <Link
                            href="#"
                            onClick={() => Page(number.id)}
                            className={`${style.btn} ${style.btnNumber} ${style.btnOther}`}
                          >
                            {number.id}
                          </Link>
                        )}
                      </div>
                    ))}
                    <Link
                      href="#"
                      onClick={() => Page(5)}
                      className={`${style.btn} ${style.btnNumber} ${style.btnOther}`}
                    >
                      ...
                    </Link>
                  </div>
                )}
                {page > 3 && formData.length - page > 2 && (
                  <div className={style.numberArea}>
                    {formData.slice(page - 2, page + 2).map((number) => (
                      <div key={number.id}>
                        {number.id == page ? (
                          <Link
                            href="#"
                            onClick={() => Page(number.id)}
                            className={`${style.btn} ${style.btnNumber} ${style.btnCurrent}`}
                          >
                            {number.id}
                          </Link>
                        ) : (
                          <Link
                            href="#"
                            onClick={() => Page(number.id)}
                            className={`${style.btn} ${style.btnNumber} ${style.btnOther}`}
                          >
                            {number.id}
                          </Link>
                        )}
                      </div>
                    ))}
                    <Link
                      href="#"
                      onClick={() => Page(page + 3)}
                      className={`${style.btn} ${style.btnNumber} ${style.btnOther}`}
                    >
                      ...
                    </Link>
                  </div>
                )}
                {page > 3 && formData.length - page <= 2 && (
                  <div className={style.numberArea}>
                    <Link
                      href="#"
                      onClick={() => Page(formData.length - 4)}
                      className={`${style.btn} ${style.btnNumber} ${style.btnOther}`}
                    >
                      ...
                    </Link>
                    {formData
                      .slice(formData.length - 4, formData.length)
                      .map((number) => (
                        <div key={number.id}>
                          {number.id == page ? (
                            <Link
                              href="#"
                              onClick={() => Page(number.id)}
                              className={`${style.btn} ${style.btnNumber} ${style.btnCurrent}`}
                            >
                              {number.id}
                            </Link>
                          ) : (
                            <Link
                              href="#"
                              onClick={() => Page(number.id)}
                              className={`${style.btn} ${style.btnNumber} ${style.btnOther}`}
                            >
                              {number.id}
                            </Link>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}
            {page != formData.length && (
              <Link
                href="#"
                onClick={nextPage}
                className={`${style.btn} ${style.btnArrow}`}
              >
                <img src="/Icon/arrow-right24_G.svg" />
              </Link>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
