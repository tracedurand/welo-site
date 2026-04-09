require("dotenv").config();

const path = require("path");
const express = require("express");
const { getProducts } = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/products", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "products.html"));
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await getProducts();
    res.json({ products });
  } catch (error) {
    console.error("Failed to fetch products:", error.message);
    res.status(500).json({ error: "Unable to load products." });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Welo site running on http://localhost:${PORT}`);
});
