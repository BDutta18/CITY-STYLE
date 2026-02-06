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

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    const arrivalCards = document.querySelectorAll(".arrival__card");
    const favouriteCards = document.querySelectorAll(".favourite__card");

    // Helper to filter cards
    const filterCards = (cards, noResultsId) => {
      let visibleCount = 0;
      cards.forEach(card => {
        const titleH4 = card.querySelector("h4");
        if (titleH4) {
          const title = titleH4.textContent.toLowerCase();
          if (title.includes(query)) {
            card.style.display = "block";
            visibleCount++;
          } else {
            card.style.display = "none";
          }
        }
      });

      const noResultsMsg = document.getElementById(noResultsId);
      if (noResultsMsg) {
        noResultsMsg.style.display = visibleCount === 0 ? "block" : "none";
      }
    }

    filterCards(arrivalCards, "arrival-no-results");
    filterCards(favouriteCards, "favourite-no-results");
  });
}
