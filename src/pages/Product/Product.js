import React from "react";
import ProductFilter from "./ProductFilter";
import ProductList from "./ProductList";

import styles from "./Product.module.css";

const Product = () => {
  document.title = "Retail Store";

  return (
    <div className={styles.product_container}>
      <ProductFilter />
      <ProductList />
    </div>
  );
};

export default Product;
