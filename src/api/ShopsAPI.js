import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../utils/fetchData";

function ShopsAPI() {
  const [shops, setShops] = useState([]);
  const [callback, setCallback] = useState(false);

  const getShops = async () => {
    const res = await API.get("/api/shops");
    setShops(res.data.shops);
  };

  useEffect(() => {
    getShops();
  }, [callback]);

  return {
    shops: [shops, setShops],
    callback: [callback, setCallback],
  };
}

export default ShopsAPI;
