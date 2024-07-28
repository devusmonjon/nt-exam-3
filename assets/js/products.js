const productInfoSize = document.querySelectorAll(
  ".product__info-size .contents button"
);
const quantity = document.querySelector("#quantity");
const maxQuantity = quantity.dataset.max;

productInfoSize.forEach((button) => {
  button.addEventListener("click", () => {
    productInfoSize.forEach((btn) => btn.classList.remove("active"));
    button.classList.toggle("active");
  });
});

function increment() {
  if (quantity.value >= maxQuantity) {
    console.log("max", maxQuantity, quantity.value);
    console.log(+quantity.value >= +maxQuantity);
  }
  quantity.value++;
}

function decrement() {
  if (quantity.value <= 1) return;
  if (quantity.value > 1) {
    quantity.value--;
  }
}
