// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { NextApiRequest, NextApiResponse } from "next";
const express = require("express");
const app = express();
// import { useRouter } from "next/router";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import axios from "axios";
import qs from "qs";

export default async function handler(req, res) {
  // if (req.method === "POST") {
  //   // 在这里可以直接访问 req.body 来获取请求体数据
  //   // const formData = JSON.parse(req.body);
  //   const { city, date, q } = req.body;
  //   const request = { city: city, date: date, q: q };
  //   const parameter = {
  //     grant_type: "client_credentials",
  //     client_id: "ball070428-909dbc5f-529f-4e9e",
  //     client_secret: "415c0c41-b817-4f8e-a4b2-7971dcb1d681",
  //   };
  //   const { data } = await axios.post(
  //     "https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token",
  //     qs.stringify(parameter),
  //     {
  //       headers: { "content-type": "application/x-www-form-urlencoded" },
  //     }
  //   );
  //   console.log(data.access_token);
  //   const { data: activity } = await axios.get(
  //     `https://tdx.transportdata.tw/api/basic/v2/Tourism/Activity/${request.city}?%24top=30&%24format=JSON`,
  //     {
  //       headers: { authorization: `Bearer ${data.access_token}` },
  //     }
  //   );
  //   // console.log(activity);
  //   // res.status(200).redirect("/search");
  //   res.status(200).json({ activity });
  //   // res.redirect("/event");
  // } else {
  //   res.status(405).end();
  // }
}
