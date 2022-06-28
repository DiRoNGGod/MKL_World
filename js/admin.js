"use strict"

function Menu() {
	document.querySelector(".header").classList.toggle("active");
	document.querySelector(".header__burger").classList.toggle("active");
	const navItem = document.querySelectorAll(".header__item");

	navItem.forEach(el => {
		el.classList.toggle("active");
	});
}

//~===================================

const popap = document.querySelector('.popap');  // * Переменная всего модального окна

function Exit() {   // * Оснавная функция показа и скрытия окна
	popap.classList.add('active');
	document.body.style.overflow = "hidden";

	document.addEventListener("click", function(event){   // * Вешаю прослушку
		if(event.target.closest('.warning__close') || 
			event.target.closest('#warning__no')) {   // * Удаление класса при нажатии на кнопку или крестик
				popap.classList.remove('active');
				document.body.style.overflow = "visible";
		}
		if(event.target.closest('.popap') && !event.target.closest('.warning')){   // * Клик на произвольную область
			popap.classList.remove('active');
			document.body.style.overflow = "visible";
		}
	});
}

//~===================================
const homeSect = document.querySelector('.home__section');
const userSect = document.querySelector('.user__section');
const infoSect = document.querySelector('.info__section');

function Home() {
	homeSect.classList.add("active");
	userSect.classList.remove("active");
	infoSect.classList.remove("active");
}

function User() {
	homeSect.classList.remove("active");
	userSect.classList.add("active");
	infoSect.classList.remove("active");
}

function Info() {
	homeSect.classList.remove("active");
	userSect.classList.remove("active");
	infoSect.classList.add("active");
}

//~====================================

const editButton = document.querySelector('.edit');  // * Переменная всего модального окна

function Edit() {   // * Оснавная функция показа и скрытия окна
	editButton.classList.add('active');
	document.body.style.overflow = "hidden";

	document.addEventListener("click", function(event){   // * Вешаю прослушку
		if(event.target.closest('.warning__close') || 
			event.target.closest('#warning__no')) {   // * Удаление класса при нажатии на кнопку или крестик
				editButton.classList.remove('active');
				document.body.style.overflow = "visible";
		}
		if(event.target.closest('.edit') && !event.target.closest('.warning')){   // * Клик на произвольную область
			editButton.classList.remove('active');
			document.body.style.overflow = "visible";
		}
	});
}

//~==============

function goHome() {
	document.location.href = "/";
}

//~===================================

const tableBody = document.querySelector(".table__body");   // ^ Получаю таблицу
let id;

tableBody.addEventListener("click", function(event){   // ^ При клике проверяю родителя и беру значение поля id
	if(event.target.closest(".table__row")) {
		let row = event.target.closest(".table__row")
		id  = row.children[0].textContent;
	}
});