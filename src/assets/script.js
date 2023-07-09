const navlinks = document.querySelectorAll(".nav-links");
const burger = document.querySelector(".togglebtn");
const nav = document.querySelector("nav");

// toggle nav
burger.addEventListener("click", (e) => {
 nav.classList.toggle("navactive");
  burger.classList.toggle("baractive");
});
navlinks[0].classList.add("active");
function acitveLink() {
  navlinks.forEach((item) => {
    item.classList.remove("active");
    this.classList.add("active");
    nav.classList.remove("navactive");
    burger.classList.remove("baractive");
  });
}
navlinks.forEach((item) => {
    item.addEventListener("click", acitveLink);
    });

$(".plan-list li").prepend(`<i class="uil uil-check"></i>`)
const tool = Array.from($(".bar-tool"));



 /**
   * Navbar links active state on scroll
   */
  let navbarlinks = $(".navbar nav .nav-links")
 const navbarlinksActive = () => {
  let position = $(window).scrollTop() + 200;
  navbarlinks.each(function() {
    let navbarlink = $(this);
    if (!navbarlink.prop('hash')) return;
    let section = $(navbarlink.prop('hash'));
    if (!section.length) return;
    if (position >= section.offset().top && position <= (section.offset().top + section.outerHeight())) {
      navbarlink.addClass('active');
    } else {
      navbarlink.removeClass('active');
    }
  });
};

$(document).ready(function() {
 navbarlinksActive();
});

$(window).scroll(function() {
 navbarlinksActive();
});



$(".nav-links").click(function(){
  $(".nav-links").removeClass("active")
  $(this).addClass("active")
})
  let bardata = []
  tool.forEach(function(e){
   bardata.push(parseInt( parseInt(e.innerText)))
  })

   // Add event listener to tab buttons
   $('.tab-button').on('click', function() {
    const tab = $(this).data('tab');
    
    // Show selected tab content
    $('.card-image').each(function() {
      const tabData = $(this).data('tab');
      if (tabData === tab || tab === 'all') {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });
$(window).scroll(function() {
  const element = $('.navbar');
  let position = window.pageYOffset;

  // Checking if the element is in the viewport
if(position > 70){
  $(element).addClass("shadow")
}
else if(position < 70){
  $(element).removeClass("shadow")
}
});

const inHandler = () =>{
  $(".progress-bar").addClass("progressbar-animation")
    let ele = $("#skill")
    if(window.pageYOffset > ele[0].offsetTop){
    for(let i = 0 ; i < bardata.length ; i++){
    anime({
    targets : tool[i],
    innerHTML: [0,bardata[i]],
    easing: 'linear',
    round: 1, })}
    }
}
const outHandler = () =>{
  $(".progress-bar").removeClass("progressbar-animation");
  console.log("ok")
}
document.addEventListener('aos:in:progressBar', inHandler);
document.addEventListener('aos:out:progressBar', outHandler);

 let  $grid = $('.portfolio-container').isotope({
  // options
  itemSelector: '.portfolio-item',
  layoutMode: 'fitRows'
});

$("#portfolio-flters li").click(function(e){
  $("#portfolio-flters li").removeClass("filter-active")
  $(this).addClass("filter-active")
  let filter  = $(this).attr("data-filter")
  $grid.isotope({ filter: filter });
})
// theme auto save 
if(localStorage.getItem("theme") == "dark"){
  $("body").addClass("dark-theme");
  $(".theme-icon i").addClass("uil-sun")
  $(".theme-icon i").removeClass("uil-moon")
}
else if(localStorage.getItem("theme") == "light") {
  $("body").removeClass("dark-theme");
  $(".theme-icon i").addClass("uil-moon")
  $(".theme-icon i").removeClass("uil-sun")
}

$(".theme-icon").on("click" , function(){
  $("body").toggleClass("dark-theme");
  if($("body").hasClass("dark-theme")){
    $(".theme-icon i").addClass("uil-sun")
    $(".theme-icon i").removeClass("uil-moon")
    localStorage.setItem("theme", "dark")
  }
  else{
    $(".theme-icon i").addClass("uil-moon")
    $(".theme-icon i").removeClass("uil-sun")
    localStorage.setItem("theme", "light")
  }
})

const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["Utkarsh", "Student", "Coder"];
const typingDelay = 200;
const erasingDelay = 50;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if (!cursorSpan.classList.contains("typing"))
      cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if (!cursorSpan.classList.contains("typing"))
      cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(
      0,
      charIndex - 1
    );
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1000);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // On DOM Load initiate the effect
  if (textArray.length) setTimeout(type, newTextDelay + 20);
});