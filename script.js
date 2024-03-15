'use strict';

// cursor follower
const circle = document.querySelector(".cursor__follower");
let pagex;
let yOffset = 0;
const onCursorMove = function(e){
    setTimeout(function(){
        circle.style.top = `${e.pageY-25}px`;
        circle.style.left = `${e.pageX-25}px`;
    },50)
    yOffset = window.pageYOffset;
    pagex = e.pageY;
}
document.addEventListener("mousemove",onCursorMove);
window.addEventListener("scroll",function(){
  let scrollLength = -yOffset+window.pageYOffset;
  circle.style.top = `${pagex-25+scrollLength}px`;
});

const btn = document.querySelectorAll(".test");
btn.forEach((value)=>{
  value.addEventListener("mouseover",function(e){
    this.classList.add("highlighter")
    circle.classList.add("highcursor__follower")
  })
  value.addEventListener("mouseout",function(e){
    circle.classList.remove("highcursor__follower")
    this.classList.remove("highlighter")
  })
})

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const buttonScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const section2 = document.querySelector("#section--2");
const header = document.querySelector(".header");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((value)=>value.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

buttonScrollTo.addEventListener("click",function(e){
  // const s1coords = section1.getBoundingClientRect();
  // window.scrollTo({
  //   left:s1coords.x+window.pageXOffset,
  //   top:s1coords.y+window.pageYOffset,
  //   behavior: 'smooth'
  // });
  section1.scrollIntoView({behavior: 'smooth'})
})

//navigation
document.querySelector(".nav__links").addEventListener("click",function(e){
    e.preventDefault();
    if(e.target.classList.contains("nav__link")){
    const section = e.target.getAttribute('href');
    document.querySelector(`${section}`).scrollIntoView({behavior : "smooth"})
    }
})

// Tabbed component
const tabsContainer = document.querySelector('.operations__tab-container');
// const tabs = document.querySelectorAll('.operations__tab');
const tabContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener("click",function(e){
  if( e.target.closest('.operations__tab')){
    const clicked = e.target.classList.contains('operations__tab') ? e.target : e.target.parentElement;
    [...clicked.parentElement.children].forEach(value=>{
      value.classList.remove('operations__tab--active');
    });
    [...tabContent].forEach(value=>{
      value.classList.remove('operations__content--active');
    });
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
    clicked.classList.add("operations__tab--active");
  }
})

// Fade effect
const nav = document.querySelector(".nav");
const fade = function(e){
  const hovered = e.target;
  if(hovered.classList.contains("nav__link")){
    const elements = hovered.closest(".nav").querySelectorAll(".nav__link");
    hovered.closest(".nav").querySelector("img").style.opacity = `${this}`;
    elements.forEach((val)=>{
      val.style.opacity = `${this}`;
    })
    hovered.style.opacity = "1";
  }
}

nav.addEventListener("mouseover",fade.bind(0.5));
nav.addEventListener("mouseout",fade.bind(1));

// Sticky navigation
// const sec1coord = section1.getBoundingClientRect();
// window.addEventListener("scroll",function(e){
//   if(window.scrollY > sec1coord.y){
//   nav.classList.add("sticky");
//   }
//   else nav.classList.remove("sticky");
// })

const headObserver = new IntersectionObserver(function(entries,o){
  const entry = entries[0];
  if(!entry.isIntersecting){
  nav.classList.add("sticky");
  }
  else nav.classList.remove("sticky")
},{
  root : null,
  threshold : 0,
  rootMargin : `-${nav.getBoundingClientRect().height}px`
})
headObserver.observe(header);

// sections appearing animation
const sectionObserver = new IntersectionObserver(function(entries){
  const [entry] = entries;
  if(!entry.isIntersecting) return
    entry.target.classList.remove("section--hidden")
    sectionObserver.unobserve(entry.target);
},{
  root:null,
  threshold:0.15
})

document.querySelectorAll(".section").forEach(function(element){
  element.classList.add("section--hidden");
  sectionObserver.observe(element);
})

// lazy loading images
const images = document.querySelectorAll(".features__img");

const lazyimg = new IntersectionObserver(function(entries,observer){
  const [entry] = entries;
  // console.log("triggered",entry);
  if(entry.isIntersecting){
    entry.target.setAttribute("src",`${entry.target.dataset.src}`);
    entry.target.classList.remove("lazy-img");
    observer.unobserve(entry.target)
  }
},{
  root:null,
  threshold:1,
  rootMargin:"200px"
})
images.forEach(element=>{
  lazyimg.observe(element);
})

//Slider implementation
const slides = document.querySelectorAll(".slide");
const sliderbtnLeft = document.querySelector(".slider__btn--left");
const sliderbtnRight = document.querySelector(".slider__btn--right");

const goToSlide = function(slide){
  slides.forEach((value,i)=>{
    value.style.transform = `translateX(${100*(i-slide)}%)`;
  })
}
goToSlide(0);

let count = 0;
sliderbtnRight.addEventListener("click",function(){
  if(count>slides.length-1) count = 0;
  goToSlide(count);  
  count++;
})

sliderbtnLeft.addEventListener("click",function(){
  if(count<1) count = slides.length;
  goToSlide(count-1);
  count--;
})
console.log("hi");
document.addEventListener("DOMContentLoaded",function(e){
  console.log("loaded");
})

