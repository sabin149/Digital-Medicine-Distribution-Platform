import React, { createContext, useEffect, useState } from "react";

import UserAPI from "./api/UserAPI";
import CategoryAPI from "./api/CategoryAPI";
import ProductsAPI from "./api/ProductsAPI";
import ShopsAPI from "./api/ShopsAPI";
import SellerProductsAPI from "./api/SellerProductsAPI";
import axios from "axios";
import { API } from "./utils/fetchData";

export const GlobalState = createContext();


export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  // const refreshToken = async () => {

  //   const res = await API.get(
  //     "/user/refresh_token"
  //   );
  //   setToken(res.data.accessToken);
  // };

  // useEffect(() => {
  //   refreshToken();
  // }, []);

  useEffect(() =>{
    const firstLogin = localStorage.getItem('firstLogin')
    if(firstLogin){
        const refreshToken = async () =>{
            const res = await API.get('/user/refresh_token')
    
            setToken(res.data.accesstoken)

            setTimeout(() => {
                refreshToken()
            }, 10 * 60 * 1000)
        }
        refreshToken()
    }
},[])

  const state = {
    token: [token, setToken],
    userAPI: UserAPI(token),
    categoryAPI: CategoryAPI(),
    productsAPI: ProductsAPI(),
    shopsAPI: ShopsAPI(),
    sellerProducts: SellerProductsAPI(token),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
