import { faker } from "@faker-js/faker";
import { statesList } from "./constant";

export const discountedPrice = (price, discount) => {
  return Math.floor((price * (100 - Math.floor(discount))) / 100);
};

export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "INR",
});

export const capitalise1stChar = (item) => {
  return item.slice(0, 1).toUpperCase() + item.slice(1, item.length);
};

export const convertRatingToWholeNumber = (n) => {
  let decimal = (n - Math.floor(n)).toFixed(2);
  let fullNumber = Math.floor(decimal * 100);
  return fullNumber >= 95 ? Math.ceil(n) : Math.floor(n);
};

export const getMaxPrice = (payload) => {
  const prices = payload
    ?.map((product) =>
      discountedPrice(product.price, product.discountPercentage)
    )
    .sort((a, b) => b - a);
  const maxPrice = Math.ceil(prices[0] / 10) * 10;
  return maxPrice;
};

export const generateRandomAddress = () => {
  return {
    name: faker.person.fullName(),
    mobile: faker.string.numeric({
      length: 10,
    }),
    alternatemobile: faker.string.numeric({
      length: 10,
    }),
    pincode: faker.location.zipCode("######"),
    city: faker.location.city(),
    address: faker.location.streetAddress(),
    state: statesList[Math.floor(Math.random() * (statesList.length - 1))],
  };
};
