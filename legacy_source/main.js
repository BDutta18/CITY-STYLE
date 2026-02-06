const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  origin: "bottom",
  distance: "50px",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__content p", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".header__btns", {
  ...scrollRevealOption,
  delay: 1500,
});

const banner = document.querySelector(".banner__container");

const bannerContent = Array.from(banner.children);

bannerContent.forEach((item) => {
  const duplicateNode = item.cloneNode(true);
  duplicateNode.setAttribute("aria-hidden", true);
  banner.appendChild(duplicateNode);
});

ScrollReveal().reveal(".arrival__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".sale__image img", {
  ...scrollRevealOption,
  origin: "left",
});
ScrollReveal().reveal(".sale__content h2", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".sale__content p", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".sale__content h4", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".sale__btn", {
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".favourite__card", {
  ...scrollRevealOption,
  interval: 500,
});

// Additional Animation Triggers
ScrollReveal().reveal(".download__image", {
  ...scrollRevealOption,
  origin: "left",
});

ScrollReveal().reveal(".download__content", {
  ...scrollRevealOption,
  origin: "right",
  delay: 300,
});

ScrollReveal().reveal(".promo__container .section__header", {
  ...scrollRevealOption,
  delay: 200,
});

ScrollReveal().reveal(".promo__container form", {
  ...scrollRevealOption,
  delay: 500,
});

// Add animate class to cards on scroll for CSS animations
const animateOnScroll = () => {
  const cards = document.querySelectorAll('.arrival__card, .favourite__card');

  cards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (cardTop < windowHeight * 0.85) {
      card.classList.add('animate');
    }
  });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Parallax effect for header
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header__image img');
  if (header) {
    const scrolled = window.pageYOffset;
    header.style.transform = `translateY(${scrolled * 0.1}px)`;
  }
});

/* --- Auth State Logic --- */
const currentUser = localStorage.getItem("currentUser");
const signinLink = document.getElementById("signin-link");
const userAvatar = document.getElementById("user-avatar");
const getStartedBtn = document.querySelector(".nav__btn");

if (currentUser && signinLink && userAvatar) {
  // User is logged in
  signinLink.style.display = "none";
  if (getStartedBtn) getStartedBtn.style.display = "none";
  userAvatar.style.display = "flex";

  // Set Initial
  const initial = currentUser.charAt(0).toUpperCase();
  userAvatar.textContent = initial;

  // Redirect to Profile on click
  userAvatar.addEventListener("click", () => {
    window.location.href = "pages/profile.html";
  });
}

/* --- Dark Mode Logic --- */
const desktopToggle = document.getElementById("theme-toggle-desktop");
const mobileToggle = document.getElementById("theme-toggle-mobile");
const toggleIcons = document.querySelectorAll(".theme-toggle i");

// Function to set theme
const setTheme = (isDark) => {
  if (isDark) {
    document.body.classList.add("dark-theme");
    toggleIcons.forEach(icon => icon.setAttribute("class", "ri-sun-line"));
  } else {
    document.body.classList.remove("dark-theme");
    toggleIcons.forEach(icon => icon.setAttribute("class", "ri-moon-line"));
  }
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

// Check local storage
const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") {
  setTheme(true);
}

// Event Listeners
[desktopToggle, mobileToggle].forEach(toggle => {
  if (toggle) {
    toggle.addEventListener("click", () => {
      const isDark = !document.body.classList.contains("dark-theme");
      setTheme(isDark);
    });
  }
});

/* --- Product Search Logic --- */
const searchInput = document.getElementById("product-search");
const searchResultsContainer = document.getElementById("search-results");

// Mock Data
const products = [
  { name: "Hoodies & Sweatshirts", image: "assets/hoodie.jpg", category: "Apparel" },
  { name: "Coats & Parkas", image: "assets/arrival-2.jpg", category: "Outerwear" },
  { name: "Oversized T-Shirt", image: "assets/OVRSIZED.webp", category: "Apparel" },
  { name: "Trending on Instagram", image: "assets/Selena Gomez.webp", category: "Collections" },
  { name: "All under $40", image: "assets/favourite-2.jpg", category: "Collections" },
  { name: "Denim Jacket", image: "assets/arrival-2.jpg", category: "Outerwear" }, // Mock item
  { name: "Urban Sneakers", image: "assets/hoodie.jpg", category: "Footwear" }, // Mock item
  { name: "Leather Bag", image: "assets/sale.png", category: "Accessories" }, // Mock item
];

if (searchInput && searchResultsContainer) {
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();

    // Clear previous results
    searchResultsContainer.innerHTML = "";

    if (query.length > 0) {
      const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );

      if (filteredProducts.length > 0) {
        searchResultsContainer.style.display = "block";

        filteredProducts.forEach(product => {
          const item = document.createElement("div");
          item.classList.add("search__result-item");
          item.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="search__result-image" />
            <div class="search__result-info">
              <h4>${product.name}</h4>
              <p>${product.category}</p>
            </div>
          `;

          item.addEventListener("click", () => {
            // In a real app, navigate to product page
            // For now, perhaps scroll to a section or go to shop
            window.location.href = "pages/shop.html";
            searchInput.value = "";
            searchResultsContainer.style.display = "none";
          });

          searchResultsContainer.appendChild(item);
        });
      } else {
        searchResultsContainer.style.display = "block";
        searchResultsContainer.innerHTML = `
          <div class="search__result-item" style="cursor: default;">
            <div class="search__result-info">
              <h4>No results found</h4>
            </div>
          </div>
        `;
      }
    } else {
      searchResultsContainer.style.display = "none";
    }
  });

  // Hide dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !searchResultsContainer.contains(e.target)) {
      searchResultsContainer.style.display = "none";
    }
  });

  // Handle Enter key
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const firstItem = searchResultsContainer.querySelector(".search__result-item");
      if (firstItem && !firstItem.textContent.includes("No results found")) {
        firstItem.click();
      }
    }
  });
}
