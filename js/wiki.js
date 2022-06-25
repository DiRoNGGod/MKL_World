// ~ Выпадающий список
/* Когда пользователь нажимает на кнопку, переключаться раскрывает содержимое */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}
// Закрыть раскрывающийся список, если пользователь щелкнет за его пределами.
window.onclick = function (event) {
    if (!event.target.matches('.wiki__button')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// ~ Галерея
let count = 0;

const btn = document.querySelector('.btn');

slideShow(count);

function slideNext(n) {
    slideShow(count += n);
}

function currentSlider(n) {
    slideShow(count = n);
}

function slideShow() {
    const sliderBody = document.querySelector('.slider__wiki');
    const sliderImg = sliderBody.children;

    const sliderDotParent = document.querySelector('.wiki__slider');
    const sliderDot = sliderDotParent.children;

    if (count > sliderImg.length - 1) {
        count = 0;
    }
    if (count < 0) {
        count = sliderImg.length - 1;
    }

    for (let i = 0; i < sliderImg.length; i++) {
        sliderImg[i].classList.remove('show');
    }
    for (let i = 0; i < sliderDot.length; i++) {
        sliderDot[i].classList.remove('active');
    }

    sliderImg[count].classList.add('show');
    sliderDot[count].classList.add('active');
}

// ~ Навигация
const wikiNav = document.querySelector('.nav__content');
const navButtons = document.querySelectorAll('.nav__item');

const history = document.querySelector('#history');
const disco = document.querySelector('#discography');
const awards = document.querySelector('#awards');
const social = document.querySelector('#social_network');

const blockHistory = document.querySelector('.wiki__history');
const blockDisco = document.querySelector('.wiki__discography');
const blockAwards = document.querySelector('.wiki__awards');
const blockSocial = document.querySelector('.wiki__social');

function removeClass() {
    navButtons.forEach(element => {
        if (element.classList.contains('active')) {
            element.classList.remove('active');
        }
    });
}

wikiNav.addEventListener("mousedown", function (event) {
    if(!event.target.classList.contains('wiki__history')){  
		removeClass();

        event.target.classList.add('active'); 

    if (history.classList.contains('active')) {
        blockHistory.classList.add('active');
    }
    else {
        blockHistory.classList.remove('active');
    }

    if (disco.classList.contains('active')) {
        blockDisco.classList.add('active');
    }
    else {
        blockDisco.classList.remove('active');
    }

    if (awards.classList.contains('active')) {
        blockAwards.classList.add('active');
    }
    else {
        blockAwards.classList.remove('active');
    }

    if (social.classList.contains('active')) {
        blockSocial.classList.add('active');
    }
    else {
        blockSocial.classList.remove('active');
    }
}
});