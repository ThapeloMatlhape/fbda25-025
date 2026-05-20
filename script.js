

document.addEventListener("DOMContentLoaded", function () {

    
    const header = document.querySelector("header");
    const nav = document.querySelector("nav");

    // Create Hamburger
    const hamburger = document.createElement("div");
    hamburger.className = "hamburger";
    hamburger.innerHTML = "&#9776;";
    hamburger.style.cssText = `
        font-size: 28px; 
        cursor: pointer; 
        display: none;
        color: #000;
    `;
    header.insertBefore(hamburger, nav);

    // Toggle Mobile Menu
    hamburger.addEventListener("click", () => {
        nav.classList.toggle("active");
        hamburger.innerHTML = nav.classList.contains("active") ? "&#10005;" : "&#9776;";
    });

    // Close menu when clicking a link
    nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("active");
            hamburger.innerHTML = "&#9776;";
        });
    });


    function setActiveLink() {
        const currentPage = window.location.pathname.split("/").pop() || "index.html";
        nav.querySelectorAll("a").forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === currentPage);
        });
    }
    setActiveLink();

    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            if (this.getAttribute("href") !== "#") {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute("href"));
                if (target) {
                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
        });
    });

    const backToTop = document.createElement("button");
    backToTop.innerHTML = "↑";
    backToTop.className = "back-to-top";
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #e30613;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(backToTop);

    window.addEventListener("scroll", () => {
        backToTop.style.display = window.scrollY > 400 ? "block" : "none";
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    const contactForm = document.querySelector(".contact-form form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = this.querySelector("input[type='text']").value;
            
            if (name.trim() === "") {
                alert("Please enter your name.");
                return;
            }

            alert(`✅ Thank you, ${name.split(" ")[0]}!\n\nYour message has been received.\n\nMcDonald's Gaborone will get back to you soon.`);
            
            // Reset form
            this.reset();
        });
    }

     
    function addCartFunctionality() {
        const menuCards = document.querySelectorAll(".menu-card, .card");
        
        menuCards.forEach(card => {
            if (card.querySelector("img")) {
                const btn = document.createElement("button");
                btn.textContent = "Add to Cart";
                btn.className = "add-to-cart-btn";
                btn.style.cssText = `
                    margin-top: 10px; 
                    background: #e30613; 
                    color: white; 
                    border: none; 
                    padding: 8px 16px; 
                    border-radius: 8px; 
                    cursor: pointer;
                    width: 100%;
                `;

                btn.addEventListener("click", () => {
                    const itemName = card.querySelector("h3").textContent;
                    const priceEl = card.querySelector(".price");
                    const price = priceEl ? priceEl.textContent : "P0.00";

                    alert(`🛒 Added to cart: ${itemName} - ${price}`);
                    
                    // Optional: You can expand this into a real cart later
                });

                // Append button only if not already there
                if (!card.querySelector(".add-to-cart-btn")) {
                    const info = card.querySelector(".menu-info") || card;
                    info.appendChild(btn);
                }
            }
        });
    }

    addCartFunctionality();
    const hero = document.querySelector(".hero");
    if (hero) {
        hero.style.opacity = "0";
        setTimeout(() => {
            hero.style.transition = "all 1.2s ease";
            hero.style.opacity = "1";
        }, 300);
    }

    // ==================== RESPONSIVE HAMBURGER STYLES ====================
    const style = document.createElement("style");
    style.innerHTML = `
        @media (max-width: 768px) {
            .hamburger { display: block; }
            nav {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: #FFCC00;
                flex-direction: column;
                padding: 15px 0;
                display: none;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            }
            nav.active { display: flex; }
            nav a {
                padding: 12px 20px;
                text-align: center;
                border-bottom: 1px solid rgba(0,0,0,0.1);
            }
        }
        
        .add-to-cart-btn:hover {
            background: #c00000 !important;
            transform: scale(1.03);
        }
        
        .back-to-top:hover {
            background: #c00000;
        }
    `;
    document.head.appendChild(style);

    console.log("✅ McDonald's Gaborone JavaScript Loaded Successfully!");
});