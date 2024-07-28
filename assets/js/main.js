"use strict";
const navbarMobile = document.querySelector(".navbar__mobile");

navbarMobile.addEventListener("click", (e) => {
  if (e.target.closest(".navbar__menu-btn")) {
    navbarMobile.classList.toggle("active");
    const carousel = document.querySelector(".owl-carousel");
    if (carousel.classList.contains("-z-1")) {
      setTimeout(() => {
        carousel.classList.remove("-z-1");
      }, 300);
    } else {
      carousel.classList.add("-z-1");
    }
  }
});

function imageLoader(selector) {
  const imageUrl = selector.querySelector("#poster").dataset.src;
  const load = selector.querySelector(".load");
  fetch(imageUrl)
    .then((response) => response.blob())
    .then((blob) => {
      const blobURL = URL.createObjectURL(blob);
      const img = selector.querySelector("#poster");
      img.src = blobURL;
      load.style.opacity = "0";
      setTimeout(() => {
        load.style.display = "none";
      }, 300);
    })
    .catch((error) => {
      console.error("Error fetching image:", error);
    });
}

function getStars() {
  // stars
  const starContainer = document.querySelectorAll(".stars");

  starContainer.forEach((container) => {
    const stars = container.querySelectorAll("i");
    stars.forEach((star, index) => {
      if (Math.floor(container.dataset.count) > index)
        star.classList.add("active");
    });
  });
}
