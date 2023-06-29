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

request.onupgradeneeded = (event) => {
  const db = event.target.result;
  const store = db.createObjectStore("products", {
    keyPath: "id",
    autoIncrement: true,
  });
  store.createIndex("product_name", "name", { unique: false });
  store.createIndex("product_price", "price", { unique: false });
  store.createIndex("product_currency", "currency", { unique: false });
  store.createIndex("product_description", "description", { unique: false });
  store.createIndex("product_img_url", "imgUrl", { unique: false });
};

request.onsuccess = () => {
  const btn = document.querySelector(".btn");
  const nameInput = document.querySelector(".product-name");
  const priceInput = document.querySelector(".product-price");
  const currencyInput = document.querySelector(".product-currency");
  const descriptionInput = document.querySelector(".product-description");
  const imageInput = document.querySelector(".product-image");

  btn.addEventListener("click", () => {
    let isValid = true;

    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach((errorMsg) => errorMsg.remove());

    if (nameInput.value.length > 25 || nameInput.value === "") {
      nameInput.classList.add("error");
      isValid = false;

      // Display error message
      const errorMessage = document.createElement("span");
      errorMessage.classList.add("error-message");
      errorMessage.textContent = "Invalid Name (maximum 25 characters)";
      nameInput.parentNode.appendChild(errorMessage);
    } else {
      nameInput.classList.remove("error");
    }

    if (Number(priceInput.value) > 10000 || priceInput.value === "") {
      priceInput.classList.add("error");
      isValid = false;

      const errorMessage = document.createElement("span");
      errorMessage.classList.add("error-message");
      errorMessage.textContent = "Invalid Price (maximum 10000)";
      priceInput.parentNode.appendChild(errorMessage);
    } else {
      priceInput.classList.remove("error");
    }

    if (descriptionInput.value.length > 60 || descriptionInput.value === "") {
      descriptionInput.classList.add("error");
      isValid = false;

      const errorMessage = document.createElement("span");
      errorMessage.classList.add("error-message");
      errorMessage.textContent = "Invalid Description (maximum 60 characters)";
      descriptionInput.parentNode.appendChild(errorMessage);
    } else {
      descriptionInput.classList.remove("error");
    }

    if (typeof imageInput.value !== "string" || imageInput.value === "") {
      imageInput.classList.add("error");
      isValid = false;

      const errorMessage = document.createElement("span");
      errorMessage.classList.add("error-message");
      errorMessage.textContent = "Invalid Image URL";
      imageInput.parentNode.appendChild(errorMessage);
    } else {
      imageInput.classList.remove("error");
    }

    if (isValid) {
      const db = request.result;
      const transaction = db.transaction("products", "readwrite");
      const store = transaction.objectStore("products");

      const product = {
        name: nameInput.value,
        price: priceInput.value,
        currency: currencyInput.value,
        description: descriptionInput.value,
        imgUrl: imageInput.value,
      };

      store.add(product);

      nameInput.value = "";
      priceInput.value = "";
      descriptionInput.value = "";
      imageInput.value = "";
    }
  });
};