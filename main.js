document.addEventListener("DOMContentLoaded", function () {
  const mainContent = document.getElementById("main-content");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const closeCartBtn = document.getElementById("close-btn");
  const productModal = document.getElementById("product-modal");
  const cartButton = document.getElementById("btn-cart");
  const profileButton = document.getElementById("btn-profile");
  const closeOrderFormBtn=document.getElementById("close-order-btn");

  closeOrderFormBtn.addEventListener("click", function () {
    let orderFrm = document.getElementById("order-form");
    if (orderFrm.style.display === "block" || orderFrm.style.display === "") {
      orderFrm.style.display = "none";
      mainContent.style.filter = "";
    } else {
      orderFrm.style.display = "block";
    }
  });
  

  placeOrderBtn.addEventListener("click", function () {
    let orderForm=document.getElementById("order-form")
    if (orderForm.style.display === "none" ||orderForm.style.display === "") {
      orderForm.style.display = "block";
      mainContent.style.filter = "blur(5px)";
    } else {
      orderForm.style.display = "none";
      mainContent.style.filter = "";
    }
  });
  
 
  
  const productDetailsContent = document.querySelector(
    ".product-details-content"
  );
  const productCloseBtn = document.getElementById("product-close-btn");

  productCloseBtn.addEventListener("click", () => {
    productDetailsContent.parentElement.classList.remove("showProduct");
  });

  cartButton.addEventListener("click", function () {
    let sidebar = document.getElementById("sidebar");
    if (sidebar.style.display === "none" || sidebar.style.display === "") {
      sidebar.style.display = "block";
    } else {
      sidebar.style.display = "none";
    }
  });

  profileButton.addEventListener("click", function () {
    window.location.href = "login.html";
  });

  closeCartBtn.addEventListener("click", function () {
    let sidebar2 = document.getElementById("sidebar");
    if (sidebar2.style.display === "block" || sidebar2.style.display === "") {
      sidebar2.style.display = "none";
    } else {
      sidebar2.style.display = "block";
    }
  });
  

  // Funcție pentru afișarea produselor
  function displayProducts(products) {
    mainContent.innerHTML = "";
    products.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.classList.add("product");

      const title = document.createElement("h2");
      title.textContent = product.title;
      title.classList.add("title-product");

      const price = document.createElement("p");
      price.textContent = `$${product.price}`;

      const image = document.createElement("img");
      image.src = product.image; 
      image.alt = product.title; 
      image.className = "demo-img";

      const addToCartBtn = document.createElement("button");
      addToCartBtn.textContent = "Add to Cart";

      addToCartBtn.addEventListener("click", function () {
        addToCart(product);
      });

      productElement.appendChild(title);
      productElement.appendChild(image); 
      productElement.appendChild(price);
      productElement.appendChild(addToCartBtn);
      mainContent.appendChild(productElement);

      image.addEventListener("click", function () {
        displayProductDetails(product);
      });
    });
  }
  

  let store = [];
 

  function addToCart(product) {
    const existingItem = store.find((item) => item.id === product.id);

    if (existingItem) {
      // If the item exists, update its quantity
      const quantityElement = existingItem.element.querySelector(".quantity");
      let currentQuantity = parseInt(
        quantityElement.textContent.split(": ")[1]
      );
      if(currentQuantity > 4){
        return
      }
      currentQuantity++;

      // Update quantity display
      quantityElement.textContent = `: ${currentQuantity}`;

      // Update total price
      let total = parseFloat(cartTotal.textContent);
      total += product.price;
      cartTotal.textContent = total.toFixed(2);
    } else {
      // Funcție pentru adăugarea produsului în coș
      const qtyContainer = document.createElement("div");
      qtyContainer.className = "qty-container";
      const cartItem = document.createElement("li");

      const itemName = document.createElement("span");
      itemName.textContent = `${product.title} : $${product.price}`;

      const quantity = document.createElement("span");
      quantity.className = "quantity";
      quantity.textContent = ": 1 ";

      const increaseBtn = document.createElement("button");
      increaseBtn.className = "increase-item-btn";
      increaseBtn.textContent = "+";

      const deleteItem = document.createElement("button");
      deleteItem.className = "delete-item-btn";
      deleteItem.textContent = "-";

      const br = document.createElement("br");

      increaseBtn.addEventListener("click", function () {
        let currentQuantity = parseInt(quantity.textContent.split(": ")[1]);
        currentQuantity++;
        if (currentQuantity >= 5) {
          increaseBtn.disabled = true;
        }
        increaseBtn.disabled;
        quantity.textContent = `: ${currentQuantity}`;

        let total = parseFloat(cartTotal.textContent);
        total += product.price;
        cartTotal.textContent = total.toFixed(2);
      });

      deleteItem.addEventListener("click", function () {
        const indexToRemove = store.findIndex(item => item.id === product.id);

        let currentQuantity = parseInt(quantity.textContent.split(": ")[1]);
        currentQuantity--;
        if (currentQuantity < 5) {
          increaseBtn.disabled = false;
        }
        if (currentQuantity >= 1) {
          quantity.textContent = `: ${currentQuantity}`;

          let total = parseFloat(cartTotal.textContent);
          total -= product.price;
          cartTotal.textContent = total.toFixed(2);
        } else {
          cartItems.removeChild(cartItem);
          let total = parseFloat(cartTotal.textContent);
          total -= product.price;
          cartTotal.textContent = total.toFixed(2);

        }
        if (indexToRemove !== -1) {
          store.splice(indexToRemove, 1);
        }
      
      });

      qtyContainer.appendChild(increaseBtn);
      qtyContainer.appendChild(quantity);
      qtyContainer.appendChild(deleteItem);
      cartItem.appendChild(itemName);
      cartItem.appendChild(br);
      cartItem.appendChild(qtyContainer);

      cartItems.appendChild(cartItem);

      // Actualizează totalul în coș
      let total = parseFloat(cartTotal.textContent);
      total += product.price;
      cartTotal.textContent = total.toFixed(2);

      store.push({
        id: product.id,
        element: cartItem, // Assign the cartItem element to the 'element' property
      });
    }
  }
  

  // Funcție pentru afișarea detaliilor produsului în fereastră modală
  function displayProductDetails(product) {
    let html = `
    <h2>${product.title}</h2>
    <img src="${product.image}" alt="" class="image-details" />
  </div>
    
    <p>Description: ${product.description}</p>
    <h3>Price: $${product.price}</h3>
    
  `;
    productDetailsContent.innerHTML = html;
    productDetailsContent.parentElement.classList.add("showProduct");
  }

  // Obține datele produselor din API
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      // Afisează primele 5 produse
      displayProducts(data.slice(0, 10));
    })
    .catch((error) => console.log("Error fetching data:", error));

  // Ascunde fereastra modală când se dă clic în afara ei
  productModal.addEventListener("click", function (event) {
    if (event.target === productModal) {
      productModal.style.display = "none";
    }
  });
  
});
