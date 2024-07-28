import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { engine, create } from "express-handlebars";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 5000;

const app = express();

const hbs = create({
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static("assets"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
    style: "/css/index.min.css",
    active: "home",
    javascript: "/js/script.js",
  });
});

app.get("/products/:id", async (req, res) => {
  const id = req.params.id;
  const data = await fetch(`https://dummyjson.com/products/${id}`).then(
    (res2) => res2.json()
  );

  const newData = {
    id,
    title: data.title,
    description: data.description,
    price: data.price,
    discountPercentage: data.discountPercentage,
    rating: data.rating,
    stock: data.stock,
    brand: data.brand,
    category: data.category,
    thumbnail: data.images[0],
    images: data.images,
    rating: data.rating,
    reviews: data.reviews,
    stock: data.stock,
    inStock:
      data.stock > 0
        ? { text: "In Stock", color: "#00ff6699" }
        : { text: "Out of Stock", color: "#ff000099" },
  };

  res.render("products", {
    title: "Product",
    style: "/css/products.min.css",
    javascript: "/js/products.js",
    active: "account",
    data: newData,
  });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
