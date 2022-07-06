const headerEl = document.querySelector("header");
const scrollToTop = document.querySelector(".scrollToTop");

window.addEventListener("scroll", () => {
  let height = headerEl.getBoundingClientRect().height;

  if (window.pageYOffset - height > 800) {
    if (!headerEl.classList.contains("sticky")) {
      headerEl.classList.add("sticky");
    }
  } else {
    headerEl.classList.remove("sticky");
  }

  if (window.pageYOffset > 2000) {
    scrollToTop.style.display = "block";
  } else {
    scrollToTop.style.display = "none";
  }
});

const glide = new Glide(".glide");
const captionsEl = document.querySelectorAll(".slide-caption");

glide.on(["mount.after", "run.after"], () => {
  const caption = captionsEl[glide.index];
  anime({
    targets: caption.children,
    opacity: [0, 1],
    duration: 400,
    easing: "spring(1, 80, 10, 0)",
    delay: anime.stagger(400, { start: 300 }),
    translateY: [anime.stagger([40, 10]), 0],
  });
});

glide.on("run.before", () => {
  document.querySelectorAll(".slide-caption > *").forEach((el) => {
    el.getElementsByClassName.opacity = 0;
  });
});
glide.mount();

const isotope = new Isotope(".cases", {
  layoutMode: "fitRows",
  itemSelector: ".case-item",
});

const filterBtns = document.querySelector(".filter-btns");

filterBtns.addEventListener("click", (e) => {
  let { target } = e;
  const filterOption = target.getAttribute("data-filter");
  if (filterOption) {
    document
      .querySelectorAll(".filter-btn.active")
      .forEach((btn) => btn.classList.remove("active"));
    target.classList.add("active");

    isotope.arrange({ filter: filterOption });
  }
});

const staggeringOption = {
  delay: 300, //reveal("")里面的类会延迟n毫秒出现
  dostance: "50px", // 从下到上有n像素的移动
  duration: 500, //控制动画时间(单位ms)
  easing: "ease-in-out",
  origin: "bottom", //动画起点
};

//reveal(类属性,{...将一个对象参数添加进来,也可以拼接一个属性进来返回一个新的对象})
//interval对象出现间隔
ScrollReveal().reveal(".feature", { ...staggeringOption, interval: 200 });
ScrollReveal().reveal(".service-item", { ...staggeringOption, interval: 200 });

const dataSectionEl = document.querySelector("data-section");
ScrollReveal().reveal(".data-section", {
  beforeReveal: () => {
    anime({
      targets: ".data-piece .num",
      innerHTML: (el) => {
        return [0, el.innerHTML];
      },
      duration: 2000,
      round: 1,
      easing: "easeInExpo",
    });
    // dataSectionEl.style.backgroundPosition = 'cent calc(50% - ${dataSectionEl.getBoundingClientRect().bottom / 5}px)';
  },
});

// 背景视差实现不了嗷嗷嗷
// window.addEventListener("scroll", () => {
//   const bottom = dataSectionEl.getBoundingClientRect().bottom;
//   const top = dataSectionEl.getBoundingClientRect().top;

//   if (bottom >= 0 && top <= window.innerHeight) {
//     dataSectionEl.style.backgroundPosition =
//       "center calc(50% - ${bottom / 5}px)";
//   }
// });

const scroll = new SmoothScroll('nav a[href*="#"],.scrollToTop a[href*="#"]', {
  header: "header",
  offset: 80,
});

document.addEventListener("scrollStart", () => {
  if(headerEl.classList.contains("open")) {
    headerEl.classList.remove("open");
  }
});
// document.addEventListener("scrollStart",()=>{
//   if (headerEl.classList.contains("open")){
//     headerEl.classList.remove("open")
//   }
// })
const exploreBtnEls = document.querySelectorAll(".explore-btn");
exploreBtnEls.forEach((exploreBtnEl) => {
  exploreBtnEl.addEventListener("click", () => {
    scroll.animateScroll(document.querySelector("#about-us"));
  });
});

//折叠按钮
const burgerEl = document.querySelector(".burger");
burgerEl.addEventListener("click", () => {
  headerEl.classList.toggle("open");
});
