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
		if(element.classList.contains('active')){
			element.classList.remove('active');
		}
	});
}

profileNav.addEventListener("mousedown", function(event){   // * События клика на кнопки родителя
	if(!event.target.classList.contains('profile__login')){   // * Проверка нажатия на логин пользователя
		removeClass();   // * Вызов функции обнуления классов

		event.target.classList.add('active');   // * Добавляю активный класс элементу события

		if(profileInfo.classList.contains('active')){   // * Включаю блоки взависимости от активной навигации
			blockInfo.classList.add('active');
		}
		else {
			blockInfo.classList.remove('active');
		}
	
		if(profileDiscus.classList.contains('active')){
			blockDiscus.classList.add('active');
		}
		else {
			blockDiscus.classList.remove('active');
		}
	
		if(profileEdit.classList.contains('active')){
			blockEdit.classList.add('active');
		}
		else {
			blockEdit.classList.remove('active');
		}
	}
});

//~====================================================================================
const popap = document.querySelector('.popap');  // * Переменная всего модального окна

function showDelete() {   // * Оснавная функция показа и скрытия окна
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

//~=========================================================================================
const blockImg = document.querySelector('.big__block');   // * Блок на всё окно
const profileImg = document.querySelector('.profile__img-item');   // * Картинка
const profile = document.querySelector('.profile__img');   // * Блок с картинкой до появления окна

let copyProfileImg = blockImg.cloneNode();  // *  Создаю блок без "profile"
let copyImg = profileImg.cloneNode();

copyProfileImg.appendChild(copyImg);   // * Засовываю копию картинки в копию блока

document.addEventListener("click", function(event){   // * Вешаю прослушку на документ
	if(event.target.closest('.profile__img')){   // * Проверяю нажатие на окошко картинки профиля
		copyProfileImg.classList.add('active');
		
		document.body.appendChild(copyProfileImg);   // * Добавляю созданный элемент в браузер

		document.body.style.overflow = "hidden";
	}

	if(event.target.closest('.big__block') &&
		!event.target.closest('.profile__img-item')){   // * Закрываю при нажатие на область вокруг картинки
			copyProfileImg.classList.remove('active');
			copyProfileImg.remove();   // * Удаляю элемент
			document.body.style.overflow = "visible";
	}
});

//~==============================================================================

const userInfo = document.querySelectorAll('.info__value');   // * Коллекция знчений профиля
const userInput = document.querySelectorAll('.user__input');

const userEdit = document.querySelector('.edit__user-info');   // * Кнопки начало и конца редактирования
const userComplete = document.querySelector('.edit__complete');

let value = [];   // * Переменная хранящая значение в полях

document.addEventListener("click", function(event){
	let count = 0;   // * Переменная номера элемента

	if(event.target.closest('.edit__user-info')){   // * Проверка нажатия на изменение профиля
		userInfo.forEach(element => {
			element.classList.remove('active');
		});
		userInput.forEach(element => {   // * Перебираю все поля ввода
			element.classList.add('active');

			if(count !== 3){   // * Получаю значения атрибута value
				element.setAttribute('value', userInfo[count].textContent);
			}
			else {   // * Получаю значения с тексареа 
				element.innerHTML = userInfo[count].textContent.replaceAll("\"", "");
			}

			count++;   // * Прибавляю счётчик
		});

		userComplete.classList.add('active');   // * Убираю и добавляю нужные кнопки
		userEdit.classList.remove('active');
	}

	if(event.target.closest('.edit__complete')){   // * Проверка нажатия на сохранение изменений профиля
		userInput.forEach(element => {   // * Перебираю поля ввода
			if(element.value !== "") {
				value[count] = element.value;   // * Получаю значение с поля

				if(count === 1){   // * Переворачиваю строку даты
					value[count] = element.value.split('-').reverse().join('.');
				}

				if(element.value === "Пол") {
					value[count] = "Не выбрано";
				}

				if(count === 3  && value[count] === ""){
					value[count] = "";
				}
				else if(count === 3  && value[count] !== ""){   // * Вставка кавычек в статус если есть текст
					value[count] = `"${value[count]}"`;
				}
			}
			else {
				value[count] = element.getAttribute('value');   // * Получаю значения с атрибутов если поле пустое
			}

			element.classList.remove('active');

			count++;
		});

		userInfo.forEach(element => {   // * Перебираю поля значений
			if(count === 4) {   // * обнуляю счёткик по достижению числа 4
				count = 0;
			}

			element.classList.add('active');

			element.innerHTML = value[count];   // * Наполняю тег значениями полей

			count++;
		});

		userComplete.classList.remove('active');   // * Убираю и добавляю нужные кнопки
		userEdit.classList.add('active');

		value.length = 0;   // * Обнуляю массив значений
	}
});