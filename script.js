document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("background-music");
  const musicBtn = document.getElementById("music-button");
  const pages = document.querySelectorAll(".page");
  const starsContainer = document.getElementById("stars");

  let currentPage = 0;

  // --- Создание звёзд ---
  function createStars() {
    for (let i = 0; i < 30; i++) {
      const star = document.createElement("div");
      star.classList.add("star");
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 50}vh`;
      star.style.animationDuration = `${Math.random() * 4 + 4}s`;
      star.style.animationDelay = `${Math.random() * 5}s`;
      starsContainer.appendChild(star);
    }
  }
  createStars();

  // --- Показ страницы ---
  function showPage(index) {
    pages.forEach((p, i) => {
      p.classList.remove("active");
    });
    pages[index].classList.add("active");
  }

  // --- Включение музыки ---
  musicBtn.addEventListener("click", function () {
    music.play()
      .then(() => {
        musicBtn.remove();
        showPage(1);
        currentPage = 1;
        enableNavigation();
      })
      .catch(() => {
        alert("Нажмите ещё раз — браузер ожидает взаимодействия.");
      });
  });

  // --- Навигация ---
  function enableNavigation() {
    document.addEventListener("click", (e) => {
      if (currentPage === 0) return;
      const x = e.clientX;
      if (x < window.innerWidth / 2) {
        if (currentPage > 1) {
          currentPage--;
          showPage(currentPage);
        }
      } else {
        if (currentPage < pages.length - 1) {
          currentPage++;
          showPage(currentPage);
        }
      }
    });

    // Клавиши
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        if (currentPage < pages.length - 1) {
          currentPage++;
          showPage(currentPage);
        }
      } else if (e.key === "ArrowLeft") {
        if (currentPage > 1) {
          currentPage--;
          showPage(currentPage);
        }
      }
    });

    // Свайп
    let startX = 0;
    document.addEventListener("touchstart", e => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    document.addEventListener("touchend", e => {
      if (!startX) return;
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > 50) {
        if (diff > 0 && currentPage < pages.length - 1) {
          currentPage++;
        } else if (diff < 0 && currentPage > 1) {
          currentPage--;
        }
        showPage(currentPage);
      }
      startX = 0;
    }, { passive: true });
  }

  // --- Имя гостя ---
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get("name") || "Дорогой гость";
  document.getElementById("guest-name").textContent = name;

  // Старт
  showPage(0);
});