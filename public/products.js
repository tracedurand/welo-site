async function loadProducts() {
  const grid = document.getElementById("products-grid");
  const loading = document.getElementById("products-loading");
  const error = document.getElementById("products-error");

  if (!grid || !loading || !error) return;

  try {
    const response = await fetch("/api/products", {
      method: "GET",
      headers: { Accept: "application/json" }
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    const products = Array.isArray(data.products) ? data.products : [];

    loading.hidden = true;
    error.hidden = true;
    grid.innerHTML = "";

    for (const product of products) {
      const card = document.createElement("article");
      card.className = "product-card";

      const size = document.createElement("p");
      size.className = "product-size";
      size.textContent = product.business_size;

      const name = document.createElement("h3");
      name.textContent = product.model_name;

      const list = document.createElement("ul");

      const userItem = document.createElement("li");
      userItem.textContent = product.user_range;
      list.appendChild(userItem);

      const throughputItem = document.createElement("li");
      throughputItem.textContent = `${product.threat_prevention_gbps} Gbps threat prevention throughput`;
      list.appendChild(throughputItem);

      const points = Array.isArray(product.overview_points) ? product.overview_points : [];
      for (const point of points) {
        const item = document.createElement("li");
        item.textContent = point;
        list.appendChild(item);
      }

      card.append(size, name, list);
      grid.appendChild(card);
    }

    if (products.length === 0) {
      loading.hidden = false;
      loading.textContent = "No products are available yet.";
    }
  } catch (err) {
    console.error("Error loading products:", err);
    loading.hidden = true;
    error.hidden = false;
  }
}

loadProducts();
