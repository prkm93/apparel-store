import React from "react";

import { useWishlist } from "../../context/WishlistContext";
import ProductCard from "../Product/ProductCard";
import styles from "./Wishlist.module.css";

const Wishlist = () => {
  const {
    wishlistState: { wishlistProducts },
  } = useWishlist();
  console.log("wishlistProducts ==>", wishlistProducts);
  document.title = "Wishlist | Retail Store";

  return (
    <div className={styles.productList}>
      {wishlistProducts?.length > 0 ? (
        wishlistProducts?.map((product) => {
          return <ProductCard product={product} key={product._id} />;
        })
      ) : (
        <div className={styles.product_unavailable}>
          Oops, no product found! Add your favourite items here!
        </div>
      )}
    </div>
  );
};

export default Wishlist;
