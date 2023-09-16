import React, { useState, useEffect } from "react";
import productContext from "./productContext";
import axios from "axios";

const ProductProvider = (props) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const [products, setProducts] = useState({ loading: true, data: null });

  const getProducts = async (filterQuery) => {
    const { collection, productType, price, size } = filterQuery;
    let query = "";
    query += `collection=${collection}`;
    if (productType.length > 0) {
      query += productType.map((p) => `&productType=${p}`).join("");
    }
    if (size.length > 0) {
      query += size.map((s) => `&size=${s}`).join("");
    }
    if (price.length > 0) {
      query += price.map((p) => `&price=${p}`).join("");
    }

    const response = await axios.get(`${BASE_URL}/product/all?${query}`);

    // console.log("product inside : ", response.data);
    setProducts({ loading: false, data: response.data });
    return response.data;
  };



  return (
    <productContext.Provider value={{ products, getProducts }}>
      {props.children}
    </productContext.Provider>
  );
};

export default ProductProvider;
