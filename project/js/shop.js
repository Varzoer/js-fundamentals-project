const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

const request = indexedDB.open("onlineShop", 1);

request.onerror = (error) => {
  console.log(error);
};

request.onsuccess = () => {
  const db = request.result;
  const transaction = db.transaction("products", "readonly");
  const store = transaction.objectStore("products");

  store.openCursor().onsuccess = (event) => {
    const cursor = event.target.result;
    if (cursor) {
      const product = cursor.value;

      const productContainer = document.querySelector(".product-container");

      const productElement = document.createElement("div");
      productElement.classList.add("product");

      const nameElement = document.createElement("h2");
      nameElement.textContent = product.name;
      nameElement.classList.add("product-name");
      productElement.appendChild(nameElement);

      const priceElement = document.createElement("p");
      priceElement.textContent = `${product.price} ${product.currency}`;
      priceElement.classList.add("product-price");
      productElement.appendChild(priceElement);

      const descriptionElement = document.createElement("p");
      descriptionElement.textContent = product.description;
      descriptionElement.classList.add("product-description");
      productElement.appendChild(descriptionElement);

      const imageElement = document.createElement("img");
      imageElement.src = product.imgUrl;
      imageElement.classList.add("product-img");
      productElement.appendChild(imageElement);

      const buttonDelElement = document.createElement("button");
      buttonDelElement.textContent = "DELETE";
      buttonDelElement.classList.add("product-btn-del");
      productElement.appendChild(buttonDelElement);

      const buttonAddElement = document.createElement("button");
      buttonAddElement.textContent = "ADD TO CART";
      buttonAddElement.classList.add("product-btn-add");
      productElement.appendChild(buttonAddElement);

      buttonDelElement.addEventListener("click", () => {
        const key = cursor.key;

        const deleteTransaction = db.transaction("products", "readwrite");
        const deleteStore = deleteTransaction.objectStore("products");

        const deleteRequest = deleteStore.delete(key);

        deleteRequest.onsuccess = () => {
          productElement.remove();
          deleteStore.delete(key);
        };

        deleteRequest.onerror = (error) => {
          console.log(error);
        };
      });

      productContainer.appendChild(productElement);

      cursor.continue();
    }
  };
};