let cart=0;function addToCart(){cart++;document.getElementById('cart-count').textContent=cart;alert('Item added to cart!');}
// ===============================
// PRODUCT DATA
// ===============================

const products = [

    {
        id: 1,
        name: "Wireless Headphones",
        price: 1499,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },

    {
        id: 2,
        name: "Smart Watch",
        price: 2499,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
    },

    {
        id: 3,
        name: "Running Shoes",
        price: 1999,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    },

    {
        id: 4,
        name: "Backpack",
        price: 999,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62"
    },

    {
        id: 5,
        name: "Sunglasses",
        price: 799,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083"
    },

    {
        id: 6,
        name: "Casual T-Shirt",
        price: 599,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
    }

];


// ===============================
// CART
// ===============================

let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


// ===============================
// DISPLAY PRODUCTS
// ===============================

function displayProducts() {

    const container =
        document.getElementById("productContainer");

    if (!container) return;

    container.innerHTML = "";

    products.forEach(product => {

        const card =
            document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="product-info">

                <h3>${product.name}</h3>

                <p class="price">
                    ₹${product.price}
                </p>

                <button
                    class="add-cart"
                    onclick="addToCart(${product.id})"
                >
                    Add to Cart
                </button>

            </div>

        `;

        container.appendChild(card);

    });

}


// ===============================
// ADD TO CART
// ===============================

function addToCart(id) {

    const product =
        products.find(item => item.id === id);

    const existing =
        cart.find(item => item.id === id);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }

    saveCart();

    alert(
        product.name +
        " added to cart!"
    );

}


// ===============================
// SAVE CART
// ===============================

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();

}


// ===============================
// DISPLAY CART
// ===============================

function displayCart() {

    const container =
        document.getElementById("cartItems");

    const totalElement =
        document.getElementById("cartTotal");

    if (!container) return;

    container.innerHTML = "";

    let total = 0;


    cart.forEach(item => {

        total +=
            item.price *
            item.quantity;


        const div =
            document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `

            <div>

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ₹${item.price}
                </p>

            </div>


            <div class="quantity">

                <button
                    onclick="changeQuantity(${item.id}, -1)"
                >
                    -
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="changeQuantity(${item.id}, 1)"
                >
                    +
                </button>

                <button
                    class="remove"
                    onclick="removeFromCart(${item.id})"
                >
                    Remove
                </button>

            </div>

        `;

        container.appendChild(div);

    });


    if (totalElement) {

        totalElement.textContent =
            total.toLocaleString();

    }

}


// ===============================
// CHANGE QUANTITY
// ===============================

function changeQuantity(id, amount) {

    const item =
        cart.find(product => product.id === id);

    if (!item) return;

    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                product =>
                    product.id !== id
            );

    }

    saveCart();

}


// ===============================
// REMOVE FROM CART
// ===============================

function removeFromCart(id) {

    cart =
        cart.filter(
            product =>
                product.id !== id
        );

    saveCart();

}


// ===============================
// CHECKOUT
// ===============================

const checkoutForm =
    document.getElementById("checkoutForm");


if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            if (cart.length === 0) {

                alert(
                    "Your cart is empty!"
                );

                return;

            }


            alert(
                "Order placed successfully! 🎉"
            );


            cart = [];


            localStorage.removeItem(
                "cart"
            );


            window.location.href =
                "index.html";

        }
    );

}


// ===============================
// INITIAL LOAD
// ===============================

displayProducts();

displayCart();
