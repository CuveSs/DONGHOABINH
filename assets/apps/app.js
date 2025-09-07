var imgFeature = document.querySelector(".img-feature");
var listImg = document.querySelectorAll(".slideshow-img__list img");
var prevBtn = document.querySelector(".prev");
var nextBtn = document.querySelector(".next");

var currentIndex = 0;
function updateImgByIndex(index) {
  currentIndex = index;
  imgFeature.src = listImg[index].getAttribute("src");
}

listImg.forEach((imgElement, index) => {
  imgElement.addEventListener("click", (e) => {
    updateImgByIndex(index);
  });
});

prevBtn.addEventListener("click", (e) => {
  imgFeature.style.animation = "";

  if (currentIndex == 0) {
    currentIndex = listImg.length - 1;
  } else {
    currentIndex--;
  }
  updateImgByIndex(currentIndex);
});

nextBtn.addEventListener("click", (e) => {
  if (currentIndex == listImg.length - 1) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }
  updateImgByIndex(currentIndex);
});

/* =========================MODAL================================= */
const showFTBtn = document.querySelector(".project__item-FT");
const modalFT = document.querySelector(".modal__FT-project");
const modalFTClose = document.querySelector(".modal__FT-close-btn");
const modalFTLayOut = document.querySelector(".modal__FT-layout");
const showCBBtn = document.querySelector(".project__item-CB");
const modalCB = document.querySelector(".modal__CB-project");
const modalCBClose = document.querySelector(".modal__CB-close-btn");
const modalCBLayOut = document.querySelector(".modal__CB-layout");

showFTBtn.addEventListener("click", (showModalFTBtn) => {
  modalFT.classList.add("open");
});

modalFTClose.addEventListener("click", (FT) => {
  modalFT.classList.remove("open");
});

modalFTLayOut.addEventListener("click", (FTLO) => {
  modalFT.classList.remove("open");
});

// CB
showCBBtn.addEventListener("click", (showCBModal) => {
  modalCB.classList.add("open");
});

modalCBClose.addEventListener("click", (CB) => {
  modalCB.classList.remove("open");
});

modalCBLayOut.addEventListener("click", (CBLO) => {
  modalCB.classList.remove("open");
});

const showGHBtn = document.querySelector(".project__item-GH");
const modalGH = document.querySelector(".modal__GH-project");
const modalGHClose = document.querySelector(".modal__GH-close-btn");
const modalGHLayOut = document.querySelector(".modal__GH-layout");

showGHBtn.addEventListener("click", (showModalGH) => {
  modalGH.classList.add("open");
});

modalGHClose.addEventListener("click", (GH) => {
  modalGH.classList.remove("open");
});

modalGHLayOut.addEventListener("click", (GHLO) => {
  modalGH.classList.remove("open");
});

/* =========================RESIZE-APPS================================= */
const showNavbarBtn = document.querySelector(".navbar__control");
const closeNavbarBtn = document.querySelector(".navbar__close-btn");
const navbarMenu = document.querySelector(".navbar");
const navbarHeaderCover = document.querySelector(".header");

showNavbarBtn.addEventListener("click", (showNavbar) => {
  navbarMenu.classList.add("navbar-open");
  navbarHeaderCover.classList.add("header-extend");
  closeNavbarBtn.classList.add("open-close-btn");
});

showNavbarBtn.addEventListener("click", (moveNavbarControl) => {
  showNavbarBtn.classList.add("click");
});

closeNavbarBtn.addEventListener("click", (closeNavbar) => {
  navbarMenu.classList.remove("navbar-open");
  navbarHeaderCover.classList.remove("header-extend");
  closeNavbarBtn.classList.remove("open-close-btn");
  showNavbarBtn.classList.remove("click");
});
