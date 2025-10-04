document.addEventListener("DOMContentLoaded", function () {
  const featureImage = document.querySelector(".img-feature");
  const thumbnails = document.querySelectorAll(".slideshow-img__list img");
  const prevButton = document.querySelector(".control.prev");
  const nextButton = document.querySelector(".control.next");

  const images = Array.from(thumbnails).map((img) => img.src);
  let currentIndex = 0;
  const slideInterval = 5000;
  const slideDuration = 500; // Phải khớp với transition trong CSS: 0.5s
  let autoSlideTimer;

  // Biến lưu trữ index trước đó để xác định hướng trượt
  let lastIndex = 0;

  // Hàm chính để cập nhật ảnh và tạo hiệu ứng trượt
  function updateSlide(newIndex) {
    // 1. Tính toán Index mới và hướng trượt
    if (newIndex >= images.length) {
      newIndex = 0;
    } else if (newIndex < 0) {
      newIndex = images.length - 1;
    }

    if (newIndex === currentIndex) {
      startAutoSlide();
      return;
    }

    // Xác định HƯỚNG trượt (true = phải qua trái, false = trái qua phải)
    const isForward =
      newIndex > currentIndex ||
      (newIndex === 0 && currentIndex === images.length - 1);
    lastIndex = currentIndex;
    currentIndex = newIndex;

    // 2. Chuẩn bị ảnh cho quá trình trượt
    // Chúng ta sẽ cần tạo một clone của ảnh hiện tại để thực hiện animation
    const currentImageClone = featureImage.cloneNode(true);
    currentImageClone.classList.remove("slide-prev", "slide-next");

    // Đặt ảnh clone ở vị trí hiện tại (0%)
    // Đặt ảnh chính ở vị trí sắp vào (100% hoặc -100%)
    featureImage.classList.add(isForward ? "slide-next" : "slide-prev");

    // Chèn ảnh clone vào ngay trước ảnh chính (trong slides-area)
    featureImage.parentNode.insertBefore(currentImageClone, featureImage);

    // 3. Thay đổi src của ảnh chính
    featureImage.src = images[currentIndex];

    // Đảm bảo ảnh chính đã sẵn sàng trượt vào (loại bỏ transition để nó nhảy đến vị trí slide-next/prev ngay lập tức)
    featureImage.style.transition = "none";
    featureImage.offsetHeight; // Kích hoạt repaint
    featureImage.style.transition = ""; // Bật lại transition

    // 4. Bắt đầu quá trình trượt
    // Đẩy ảnh cũ ra và kéo ảnh mới vào
    requestAnimationFrame(() => {
      // Đẩy ảnh cũ (clone) ra
      currentImageClone.classList.add(isForward ? "slide-prev" : "slide-next");

      // Kéo ảnh mới (featureImage) vào
      featureImage.classList.remove("slide-prev", "slide-next"); // Đưa về translateX(0)
    });

    // 5. Dọn dẹp DOM sau khi hiệu ứng hoàn tất
    setTimeout(() => {
      currentImageClone.remove(); // Xóa ảnh clone cũ
      updateThumbnails();
      startAutoSlide();
    }, slideDuration);
  }

  // ... (Giữ nguyên hàm updateThumbnails, startAutoSlide và phần gắn sự kiện cho nút) ...
  function updateThumbnails() {
    thumbnails.forEach((thumb, i) => {
      thumb.classList.remove("active");
      if (i === currentIndex) {
        thumb.classList.add("active");
      }
    });
  }

  function startAutoSlide() {
    clearInterval(autoSlideTimer);
    autoSlideTimer = setInterval(() => {
      updateSlide(currentIndex + 1);
    }, slideInterval);
  }

  prevButton.addEventListener("click", () => {
    clearInterval(autoSlideTimer);
    updateSlide(currentIndex - 1);
  });

  nextButton.addEventListener("click", () => {
    clearInterval(autoSlideTimer);
    updateSlide(currentIndex + 1);
  });

  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      clearInterval(autoSlideTimer);
      updateSlide(index);
    });
  });

  if (images.length > 0) {
    updateThumbnails();
    startAutoSlide();
  }
});

/* =========================MODAL================================= */
const modalElements = [
  {
    btnSelector: ".project__item-FT",
    modalSelector: ".modal__FT-project",
    closeSelector: ".modal__FT-close-btn",
    layoutSelector: ".modal__FT-layout",
  },
  {
    btnSelector: ".project__item-CB",
    modalSelector: ".modal__CB-project",
    closeSelector: ".modal__CB-close-btn",
    layoutSelector: ".modal__CB-layout",
  },
  {
    btnSelector: ".project__item-GH",
    modalSelector: ".modal__GH-project",
    closeSelector: ".modal__GH-close-btn",
    layoutSelector: ".modal__GH-layout",
  },
];

function setupModal(selectors) {
  const showBtn = document.querySelector(selectors.btnSelector);
  const modal = document.querySelector(selectors.modalSelector);
  const modalClose = document.querySelector(selectors.closeSelector);
  const modalLayout = document.querySelector(selectors.layoutSelector);

  if (!showBtn || !modal || !modalClose || !modalLayout) {
    console.error(
      "Không tìm thấ một hoặc nhiều phần tử Modal",
      selectors.modalSelector
    );
    return;
  }

  // Define O/C function

  const openModal = () => {
    modal.classList.add("open");
    document.body.classList.add("no-scroll");
  };

  const closeModal = () => {
    modal.classList.remove("open");
    document.body.classList.remove("no-scroll");
  };

  // Setup evenListeners
  showBtn.addEventListener("click", openModal);
  modalClose.addEventListener("click", closeModal);
  modalLayout.addEventListener("click", closeModal);
}

modalElements.forEach(setupModal);

/* =========================RESIZE-APPS================================= */
document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      // Change vision status
      navMenu.classList.toggle("nav--open");

      // Change Icon (Hamburger to "X")
      if (navMenu.classList.contains("nav--open")) {
        navToggle.innerHTML = "&#x2715;";
      } else {
        navToggle.innerHTML = "&#9776";
      }
    });

    // (Option) Close Menu when click a link
    const navLinks = navMenu.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("nav--open");
        navToggle.innerHTML = "&#9776;";
      });
    });
  }
});

/* =========================LANGUAGE================================= */
document.addEventListener("DOMContentLoaded", function () {
  function googleTranslateElementInit() {
    new google.translate.TranslateElement(
      {
        pageLanguage: "vi",
        includedLanguages: "en",
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
      },
      "google_translate_element"
    );
    setupCustomLanguageToggle();
  }

  function setupCustomLanguageToggle() {
    const langCheckbox = document.getElementById("langCheckbox");

    // Translate active function
    function triggerLanguageChange(targetLang) {
      const selectElement = document.querySelector(".goog-te-combo");

      if (selectElement) {
        console.log("Translate to:", targetLang);
        selectElement.value = targetLang;
        selectElement.dispatchEvent(new Event("change"));
        document.body.setAttribute("data-lang", targetLang);
      } else {
        console.error(
          "ERROR: Can not found any hide dropdown (.goog-te-combe) to active translate."
        );
        setTimeout(setupCustomLanguageToggle, 100);
      }
    }

    if (langCheckbox) {
      langCheckbox.addEventListener("change", function () {
        if (this.checked) {
          triggerLanguageChange("en");
        } else {
          triggerLanguageChange("vi");
        }
      });

      document.body.setAttribute("data-lang", "vi");
    }
  }
});
