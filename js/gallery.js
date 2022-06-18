"use strict"

let count = 0;   // ^ Счётчик слайдера

const btn = document.querySelectorAll('.btn');

slideShowAll(count);   // ^ Основной метод
slideShowHope(count);   // ^ Основной метод
slideShowJimin(count);   // ^ Основной метод
slideShowJin(count);   // ^ Основной метод
slideShowJung(count);   // ^ Основной метод
slideShowNamj(count);   // ^ Основной метод
slideShowTaeh(count);   // ^ Основной метод
slideShowYoon(count);   // ^ Основной метод

function slideNextAll(n) {   // ^ Изменение счётчика
	slideShowAll(count += n);
}
function slideNextHope(n) {   // ^ Изменение счётчика
	slideShowHope(count += n);
}
function slideNextJimin(n) {   // ^ Изменение счётчика
	slideShowJimin(count += n);
}
function slideNextJin(n) {   // ^ Изменение счётчика
	slideShowJin(count += n);
}
function slideNextJung(n) {   // ^ Изменение счётчика
	slideShowJung(count += n);
}
function slideNextNamj(n) {   // ^ Изменение счётчика
	slideShowNamj(count += n);
}
function slideNextTaeh(n) {   // ^ Изменение счётчика
	slideShowTaeh(count += n);
}
function slideNextYoon(n) {   // ^ Изменение счётчика
	slideShowYoon(count += n);
}

// ! ===========================================

function currentSliderAll(n) {   // ^ Точки счётчика
	slideShowAll(count = n);
}
function currentSliderHope(n) {   // ^ Точки счётчика
	slideShowHope(count = n);
}
function currentSliderJimin(n) {   // ^ Точки счётчика
	slideShowJimin(count = n);
}
function currentSliderJin(n) {   // ^ Точки счётчика
	slideShowJin(count = n);
}
function currentSliderJung(n) {   // ^ Точки счётчика
	slideShowJung(count = n);
}
function currentSliderNamj(n) {   // ^ Точки счётчика
	slideShowNamj(count = n);
}
function currentSliderTaeh(n) {   // ^ Точки счётчика
	slideShowTaeh(count = n);
}
function currentSliderYoon(n) {   // ^ Точки счётчика
	slideShowYoon(count = n);
}

function slideShowAll() {
	const sliderBody = document.querySelector('.slider__all');   // ^ Получаю родителя
	const sliderImg = sliderBody.children;   // ^ Получаю детей

	const sliderDotParent = document.querySelector('.slider__dot_all');   // ^ Получаю родителя точек
	const sliderDot = sliderDotParent.children;   // ^ Получаю точки

	if (count > sliderImg.length - 1) {   // ^ Проверка что число меньше количества картинок
		count = 0;
	}
	if (count < 0) {   // ^ Число не меньше нуля
		count = sliderImg.length - 1;
	}

	for (let i = 0; i < sliderImg.length; i++) {   // ^ Убираю класс у картинок
		sliderImg[i].classList.remove('show');
	}
	for (let i = 0; i < sliderDot.length; i++) {   // ^ Убираю класс у точек
		sliderDot[i].classList.remove('active');
	}

	sliderImg[count].classList.add('show');   // ^ Показываю нужную картинку
	sliderDot[count].classList.add('active');   // ^ Показываю нужную точку
}

// !=============================================

function slideShowHope() {
	const sliderBody = document.querySelector('.slider__hope');   // ^ Получаю родителя
	const sliderImg = sliderBody.children;   // ^ Получаю детей

	const sliderDotParent = document.querySelector('.slider__dot_hope');   // ^ Получаю родителя точек
	const sliderDot = sliderDotParent.children;   // ^ Получаю точки

	if (count > sliderImg.length - 1) {   // ^ Проверка что число меньше количества картинок
		count = 0;
	}
	if (count < 0) {   // ^ Число не меньше нуля
		count = sliderImg.length - 1;
	}

	for (let i = 0; i < sliderImg.length; i++) {   // ^ Убираю класс у картинок
		sliderImg[i].classList.remove('show');
	}
	for (let i = 0; i < sliderDot.length; i++) {   // ^ Убираю класс у точек
		sliderDot[i].classList.remove('active');
	}

	sliderImg[count].classList.add('show');   // ^ Показываю нужную картинку
	sliderDot[count].classList.add('active');   // ^ Показываю нужную точку
}

// !=============================================

function slideShowJimin() {
	const sliderBody = document.querySelector('.slider__jimin');   // ^ Получаю родителя
	const sliderImg = sliderBody.children;   // ^ Получаю детей

	const sliderDotParent = document.querySelector('.slider__dot_jimin');   // ^ Получаю родителя точек
	const sliderDot = sliderDotParent.children;   // ^ Получаю точки

	if (count > sliderImg.length - 1) {   // ^ Проверка что число меньше количества картинок
		count = 0;
	}
	if (count < 0) {   // ^ Число не меньше нуля
		count = sliderImg.length - 1;
	}

	for (let i = 0; i < sliderImg.length; i++) {   // ^ Убираю класс у картинок
		sliderImg[i].classList.remove('show');
	}
	for (let i = 0; i < sliderDot.length; i++) {   // ^ Убираю класс у точек
		sliderDot[i].classList.remove('active');
	}

	sliderImg[count].classList.add('show');   // ^ Показываю нужную картинку
	sliderDot[count].classList.add('active');   // ^ Показываю нужную точку
}

// !=============================================

function slideShowJin() {
	const sliderBody = document.querySelector('.slider__jin');   // ^ Получаю родителя
	const sliderImg = sliderBody.children;   // ^ Получаю детей

	const sliderDotParent = document.querySelector('.slider__dot_jin');   // ^ Получаю родителя точек
	const sliderDot = sliderDotParent.children;   // ^ Получаю точки

	if (count > sliderImg.length - 1) {   // ^ Проверка что число меньше количества картинок
		count = 0;
	}
	if (count < 0) {   // ^ Число не меньше нуля
		count = sliderImg.length - 1;
	}

	for (let i = 0; i < sliderImg.length; i++) {   // ^ Убираю класс у картинок
		sliderImg[i].classList.remove('show');
	}
	for (let i = 0; i < sliderDot.length; i++) {   // ^ Убираю класс у точек
		sliderDot[i].classList.remove('active');
	}

	sliderImg[count].classList.add('show');   // ^ Показываю нужную картинку
	sliderDot[count].classList.add('active');   // ^ Показываю нужную точку
}

// !=============================================

function slideShowJung() {
	const sliderBody = document.querySelector('.slider__jung');   // ^ Получаю родителя
	const sliderImg = sliderBody.children;   // ^ Получаю детей

	const sliderDotParent = document.querySelector('.slider__dot_jung');   // ^ Получаю родителя точек
	const sliderDot = sliderDotParent.children;   // ^ Получаю точки

	if (count > sliderImg.length - 1) {   // ^ Проверка что число меньше количества картинок
		count = 0;
	}
	if (count < 0) {   // ^ Число не меньше нуля
		count = sliderImg.length - 1;
	}

	for (let i = 0; i < sliderImg.length; i++) {   // ^ Убираю класс у картинок
		sliderImg[i].classList.remove('show');
	}
	for (let i = 0; i < sliderDot.length; i++) {   // ^ Убираю класс у точек
		sliderDot[i].classList.remove('active');
	}

	sliderImg[count].classList.add('show');   // ^ Показываю нужную картинку
	sliderDot[count].classList.add('active');   // ^ Показываю нужную точку
}

// !=============================================

function slideShowNamj() {
	const sliderBody = document.querySelector('.slider__namj');   // ^ Получаю родителя
	const sliderImg = sliderBody.children;   // ^ Получаю детей

	const sliderDotParent = document.querySelector('.slider__dot_namj');   // ^ Получаю родителя точек
	const sliderDot = sliderDotParent.children;   // ^ Получаю точки

	if (count > sliderImg.length - 1) {   // ^ Проверка что число меньше количества картинок
		count = 0;
	}
	if (count < 0) {   // ^ Число не меньше нуля
		count = sliderImg.length - 1;
	}

	for (let i = 0; i < sliderImg.length; i++) {   // ^ Убираю класс у картинок
		sliderImg[i].classList.remove('show');
	}
	for (let i = 0; i < sliderDot.length; i++) {   // ^ Убираю класс у точек
		sliderDot[i].classList.remove('active');
	}

	sliderImg[count].classList.add('show');   // ^ Показываю нужную картинку
	sliderDot[count].classList.add('active');   // ^ Показываю нужную точку
}

// !=============================================

function slideShowTaeh() {
	const sliderBody = document.querySelector('.slider__taeh');   // ^ Получаю родителя
	const sliderImg = sliderBody.children;   // ^ Получаю детей

	const sliderDotParent = document.querySelector('.slider__dot_taeh');   // ^ Получаю родителя точек
	const sliderDot = sliderDotParent.children;   // ^ Получаю точки

	if (count > sliderImg.length - 1) {   // ^ Проверка что число меньше количества картинок
		count = 0;
	}
	if (count < 0) {   // ^ Число не меньше нуля
		count = sliderImg.length - 1;
	}

	for (let i = 0; i < sliderImg.length; i++) {   // ^ Убираю класс у картинок
		sliderImg[i].classList.remove('show');
	}
	for (let i = 0; i < sliderDot.length; i++) {   // ^ Убираю класс у точек
		sliderDot[i].classList.remove('active');
	}

	sliderImg[count].classList.add('show');   // ^ Показываю нужную картинку
	sliderDot[count].classList.add('active');   // ^ Показываю нужную точку
}

// !=============================================

function slideShowYoon() {
	const sliderBody = document.querySelector('.slider__yoon');   // ^ Получаю родителя
	const sliderImg = sliderBody.children;   // ^ Получаю детей

	const sliderDotParent = document.querySelector('.slider__dot_yoon');   // ^ Получаю родителя точек
	const sliderDot = sliderDotParent.children;   // ^ Получаю точки

	if (count > sliderImg.length - 1) {   // ^ Проверка что число меньше количества картинок
		count = 0;
	}
	if (count < 0) {   // ^ Число не меньше нуля
		count = sliderImg.length - 1;
	}

	for (let i = 0; i < sliderImg.length; i++) {   // ^ Убираю класс у картинок
		sliderImg[i].classList.remove('show');
	}
	for (let i = 0; i < sliderDot.length; i++) {   // ^ Убираю класс у точек
		sliderDot[i].classList.remove('active');
	}

	sliderImg[count].classList.add('show');   // ^ Показываю нужную картинку
	sliderDot[count].classList.add('active');   // ^ Показываю нужную точку
}