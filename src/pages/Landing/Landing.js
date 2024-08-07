import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useProducts } from "../../context/ProductContext";
import { filterActionTypes } from "../../utils/constant";
import styles from "./Landing.module.css";
import ecommerce_hero from "../../logos/ecommerce-hero.jpg";

const Landing = () => {
  const {
    productState: { productList, categoryList },
    productDispatch,
  } = useProducts();

  const navigate = useNavigate();

  const { FILTER_BY_CATEGORY, CLEAR_FILTER } = filterActionTypes;

  useEffect(() => {
    productDispatch({
      type: CLEAR_FILTER,
      payload: {
        categoryList,
        productList,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  document.title = "Retail Store";

  return (
    <div className={styles.home_container}>
      <img
        className={styles.landing_thumbail}
        src={ecommerce_hero}
        alt="electronics thumbail"
      />
      <div className={styles.category_label}>
        <h2>What are you shopping for today?</h2>
      </div>
      <div className={styles.category_section}>
        {categoryList &&
          categoryList.map((item) => {
            const { _id, categoryName, thumbnail, description } = item;
            return (
              <div
                className={styles.category_card}
                key={_id}
                onClick={() => {
                  productDispatch({
                    type: FILTER_BY_CATEGORY,
                    payload: categoryName,
                  });
                  navigate("/products");
                }}>
                <img
                  className={styles.card_img}
                  src={thumbnail}
                  alt={categoryName}
                />
                <div className={styles.card_details}>
                  <h3>{categoryName}</h3>
                  <div className={styles.card_description}>{description}</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Landing;
