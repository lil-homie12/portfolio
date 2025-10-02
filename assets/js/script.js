/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll("[data-target]"),
  tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);
    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("qualification__active");
    });
    target.classList.add("qualification__active");

    tabs.forEach((tab) => {
      tab.classList.remove("qualification__active");
    });
    tab.classList.add("qualification__active");
  });
});

/*==================== TESTIMONIAL ====================*/
let swiperTestimonial = new Swiper(".testimonial__container", {
  loop: true,
  grabCursor: true,
  spaceBetween: 48,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  breakpoints: {
    568: {
      slidesPerView: 2,
    },
  },
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute("id");

    // Find the corresponding navigation link
    const navLink = document.querySelector(
      ".nav__menu a[href*=" + sectionId + "]"
    );

    // Only proceed if the navigation link exists
    if (navLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink.classList.add("active-link");
      } else {
        navLink.classList.remove("active-link");
      }
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById("header");
  // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*==================== COPY TO CLIPBOARD ====================*/
// Function to show copy tooltip
function showCopyTooltip(element, text) {
  // Remove any existing tooltips
  const existingTooltips = document.querySelectorAll(".copy-tooltip");
  existingTooltips.forEach((tooltip) => tooltip.remove());

  // Create tooltip element
  const tooltip = document.createElement("div");
  tooltip.className = "copy-tooltip";
  tooltip.textContent = `Copied: ${text}`;
  document.body.appendChild(tooltip);

  // Position tooltip above the clicked element
  const rect = element.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  tooltip.style.left = `${rect.left + scrollLeft + rect.width / 2}px`;
  tooltip.style.top = `${rect.top + scrollTop - 60}px`;
  tooltip.style.transform = "translateX(-50%)";

  // Show tooltip with animation
  requestAnimationFrame(() => {
    tooltip.classList.add("show");
  });

  // Remove tooltip after 2.5 seconds
  setTimeout(() => {
    tooltip.classList.remove("show");
    setTimeout(() => {
      if (tooltip.parentNode) {
        document.body.removeChild(tooltip);
      }
    }, 300);
  }, 2500);
}

// Initialize copy functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  const copyableElements = document.querySelectorAll(".contact__copyable");

  copyableElements.forEach((element) => {
    element.addEventListener("click", async (e) => {
      e.preventDefault();
      const textToCopy = element.getAttribute("data-copy");

      try {
        await navigator.clipboard.writeText(textToCopy);

        // Show visible tooltip
        showCopyTooltip(element, textToCopy);

        // Show visual feedback on element
        element.style.transform = "translateY(-3px)";

        // Reset element transform after animation
        setTimeout(() => {
          element.style.transform = "translateY(-5px)";
        }, 200);
      } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
          const successful = document.execCommand("copy");
          if (successful) {
            // Show visible tooltip
            showCopyTooltip(element, textToCopy);

            // Show visual feedback on element
            element.style.transform = "translateY(-3px)";

            // Reset element transform after animation
            setTimeout(() => {
              element.style.transform = "translateY(-5px)";
            }, 200);
          } else {
            throw new Error("Copy command failed");
          }
        } catch (err) {
          console.error("Failed to copy text: ", err);

          // Show error tooltip
          const tooltip = document.createElement("div");
          tooltip.className = "copy-tooltip";
          tooltip.textContent = "Failed to copy";
          tooltip.style.background = "#e74c3c";
          document.body.appendChild(tooltip);

          const rect = element.getBoundingClientRect();
          const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;
          const scrollLeft =
            window.pageXOffset || document.documentElement.scrollLeft;

          tooltip.style.left = `${rect.left + scrollLeft + rect.width / 2}px`;
          tooltip.style.top = `${rect.top + scrollTop - 60}px`;
          tooltip.style.transform = "translateX(-50%)";

          requestAnimationFrame(() => {
            tooltip.classList.add("show");
          });

          setTimeout(() => {
            tooltip.classList.remove("show");
            setTimeout(() => {
              if (tooltip.parentNode) {
                document.body.removeChild(tooltip);
              }
            }, 300);
          }, 2500);
        }

        document.body.removeChild(textArea);
      }
    });
  });
});
