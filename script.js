document.addEventListener("DOMContentLoaded", () => {
    // Mobile Navbar Toggle
    const navItems = document.querySelector(".nav-items");
    const menuToggle = document.createElement("div");
    menuToggle.innerHTML = `<i class="fas fa-bars"></i>`;
    menuToggle.classList.add("menu-toggle");
    document.querySelector(".navbar").appendChild(menuToggle);

    menuToggle.addEventListener("click", () => {
        navItems.classList.toggle("show");
    });

    // Smooth Scrolling for Navbar Links
    document.querySelectorAll(".nav-items a").forEach(anchor => {
        anchor.addEventListener("click", (event) => {
            event.preventDefault();
            const targetId = anchor.getAttribute("href").substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
        });
    });
    
    // Product Data (Dynamically Loaded)
    const products = [
        { id: 1, name: "Elegant Red Dress", price: 49.99, image: "d4.jpg" },
        { id: 2, name: "Stylish Black Gown", price: 69.99, image: "d5.jpg" },
        { id: 3, name: "Casual Summer Dress", price: 39.99, image: "d6.jpg" },
        { id: 4, name: "Party Wear Maxi", price: 59.99, image: "d7.jpg" },
    ];

    const productGrid = document.getElementById("productGrid");

    products.forEach(product => {
        let productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
        productGrid.appendChild(productCard);
    });

    // Shopping Cart Functionality
    const cart = [];
    const cartCount = document.querySelector(".cart-count");
    const cartSidebar = document.getElementById("cartSidebar");
    const cartItemsContainer = document.querySelector(".cart-items");
    const cartTotal = document.getElementById("cartTotal");

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (e) => {
            const productId = parseInt(e.target.dataset.id);
            const product = products.find(p => p.id === productId);
            addToCart(product);
        });
    });

    function addToCart(product) {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartUI();
    }

    function updateCartUI() {
        cartItemsContainer.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            total += item.price * item.quantity;
            let cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-details">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        cartTotal.textContent = total.toFixed(2);
        cartCount.textContent = cart.length;

        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", (e) => {
                const productId = parseInt(e.target.dataset.id);
                removeFromCart(productId);
            });
        });
    }

    function removeFromCart(id) {
        const itemIndex = cart.findIndex(item => item.id === id);
        if (itemIndex > -1) {
            cart[itemIndex].quantity--;
            if (cart[itemIndex].quantity === 0) {
                cart.splice(itemIndex, 1);
            }
        }
        updateCartUI();
    }

    // Open and Close Cart Sidebar
    document.querySelector(".cart-icon").addEventListener("click", () => {
        cartSidebar.style.right = "0";
    });

    document.querySelector(".close-cart").addEventListener("click", () => {
        cartSidebar.style.right = "-100px";
    });
});
