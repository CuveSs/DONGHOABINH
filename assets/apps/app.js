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
const showBtns = document.querySelectorAll(".project__list .project__item");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modal__close-btn");

function showModalBtn() {
  modal.classList.add("open");
}

function hideModalBtn() {
  modal.classList.remove("open");
}

for (const showBtn of showBtns) {
  showBtn.addEventListener("click", showModalBtn);
}

modalClose.addEventListener("click", hideModalBtn);
