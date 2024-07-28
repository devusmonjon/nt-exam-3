"use strict";
const productsContent = document.querySelector(".prdt");
const skeleton = document.querySelector(".skeleton");
const loadMore = document.querySelector(".load-more");

// carousel
$(".owl-carousel").owlCarousel({
  items: 1,
  lazyLoad: true,
  loop: true,
  margin: 10,
  dots: false,
});

let skip = 0;
const API_URL = "https://dummyjson.com";

function fetchData(API_URL, skip, endpoint) {
  fetch(`${API_URL}/${endpoint}?limit=12&skip=${skip}`)
    .then((response) => response.json())
    .then((data) => {
      createCards(data.products);
    })
    .finally(() => {
      skeleton.remove();
    });
}

function firstStart() {
  fetchData(API_URL, skip, "products");
}
firstStart();

loadMore.addEventListener("click", () => {
  skip += 12;
  fetchData(API_URL, skip, "products");
});

function createCards(data) {
  data.forEach((product) => {
    const productsItem = document.createElement("div");
    productsItem.classList.add("products__item");
    productsItem.innerHTML = `
                <div class="products__item-bg">
                    <img id="poster" data-src="${product.images[0]}" alt="${product.title}" onclick="productOpen(${product.id})">
                    <div class="load">
                        <span class="loader"></span>
                    </div>
                    <button type="button">Add To Cart</button>
                </div>
                <div class="products__item-info">
                    <h3 class="products__item-title" title="${product.title}">
                        <a href="/products/${product.id}">${product.title}</a>
                    </h3>
                    <div class="products__item-desc">
                        <span>${product.price}</span>
                        <div class="stars" data-count="${product.rating}">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </div>
                        <span>(${product.reviews.length})</span>
                    </div>
                </div>
                <div class="abs-btns">
                    <button type="button" class="like">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M8 5C5.7912 5 4 6.73964 4 8.88594C4 10.6185 4.7 14.7305 11.5904 18.8873C11.7138 18.961 11.8555 19 12 19C12.1445 19 12.2862 18.961 12.4096 18.8873C19.3 14.7305 20 10.6185 20 8.88594C20 6.73964 18.2088 5 16 5C13.7912 5 12 7.35511 12 7.35511C12 7.35511 10.2088 5 8 5Z"
                                stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                    <button type="button" class="like">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="16" viewBox="0 0 22 16" fill="none">
                            <path
                                d="M20.257 6.962C20.731 7.582 20.731 8.419 20.257 9.038C18.764 10.987 15.182 15 11 15C6.81801 15 3.23601 10.987 1.74301 9.038C1.51239 8.74113 1.38721 8.37592 1.38721 8C1.38721 7.62408 1.51239 7.25887 1.74301 6.962C3.23601 5.013 6.81801 1 11 1C15.182 1 18.764 5.013 20.257 6.962V6.962Z"
                                stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path
                                d="M11 11C12.6569 11 14 9.65685 14 8C14 6.34315 12.6569 5 11 5C9.34315 5 8 6.34315 8 8C8 9.65685 9.34315 11 11 11Z"
                                stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>`;
    productsContent.append(productsItem);
    imageLoader(productsItem);
    getStars();
  });
}

function productOpen(id) {
  window.location.href = `/products/${id}`;
}
