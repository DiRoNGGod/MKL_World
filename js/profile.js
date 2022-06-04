"use strict"

const profileNav = document.querySelector('.nav__content');   // * Переменная родителя навигации
const navButtons = document.querySelectorAll('.nav__item');   // * Коллекция кнопок

const profileInfo = document.querySelector('#info');   // * Переменные отдельных кнопок
const profileDiscus = document.querySelector('#discus');
const profileEdit = document.querySelector('#edit');

const blockInfo = document.querySelector('.profile__info');   // * Переменные блоков соответствующих кнопок
const blockDiscus = document.querySelector('.profile__discussions');
const blockEdit = document.querySelector('.profile__edit');

function removeClass() {   // * Функция обнуления классов
	navButtons.forEach(element => {   // * Убираю класс актив, если такой существует
		if (element.classList.contains('active')){
			element.classList.remove('active');
		}
	});
}

profileNav.addEventListener("click", function(event){   // * События клика на кнопки родителя
	if (!event.target.classList.contains('profile__login')){   // * Проверка нажатия на логин пользователя
		removeClass();   // * Вызов функции обнуления классов

		event.target.classList.add('active');   // * Добавляю активный класс элементу события

		if (profileInfo.classList.contains('active')){   // * Включаю блоки взависимости от активной навигации
			blockInfo.classList.add('active');
		}
		else {
			blockInfo.classList.remove('active');
		}
	
		if (profileDiscus.classList.contains('active')){
			blockDiscus.classList.add('active');
		}
		else {
			blockDiscus.classList.remove('active');
		}
	
		if (profileEdit.classList.contains('active')){
			blockEdit.classList.add('active');
		}
		else {
			blockEdit.classList.remove('active');
		}
	}
});