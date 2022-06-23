allDiv = 3;
function showDv(n) {
	document.querySelector('.confirm').classList.remove('go');
	document.querySelector('.confirm').classList.remove('error');

	for (i = 1; allDiv + 1 > i; i++) {
		document.getElementById('d' + i).style.display = 'none';
	}
	document.getElementById('d' + n).style.display = 'flex';
	return false;
}

// ^ При загрузке страницы
window.addEventListener("DOMContentLoaded", () => {

	// ^ Ищем форму register и Прослушиваем нажатие на кнопку submit
	document
		.getElementById("register")
		.addEventListener("submit", (event) => {
			event.preventDefault();
			const login = event.target.name.value;
			const email = event.target.email.value;
			const password = event.target.password.value;
			const date = new Date().toLocaleDateString();

			// ^ создаем пакет который подет на адрес /register методом post
			fetch("/register", {
				method: "POST",
				headers: {   // ^ заголовки пакета
					Accept: "application/json",   // ^ разрешаем json
					"Content-Type": "application/json",   // ^ пишем тип контента json
				},
				// ^ тело запроса
				body: JSON.stringify({
					login: login,
					email: email,
					password: password,
					date: date,
				}),
			}).then((res) => {
				if (res.status >= 200 && res.status < 300) {   // ^ Если всё прошло успешно
					document.querySelector('.confirm').classList.remove('error');   // ^ Удаля. окно с ошибкой
					document.querySelector('.confirm').classList.add('go');   // ^ Добавляю зелёное окошко
					document.querySelector('.confirm').innerHTML = 'Регистрация прошла успешнa!';
					setTimeout( function(){
						document.location.href = "/profile";   // ^ Через секунду отправляю пользователя в профиль
					},1000);
				} else if(res.status == 401) {   // ^ Если логин уже существует
					event.target.name.value = "";   // ^ Обнуляю логин
					event.target.password.value = "";   // ^ Обнуляю пароль

					document.querySelector('.confirm').classList.remove('go');   // ^ Удаляю зелёное окошко
					document.querySelector('.confirm').innerHTML = 'Логин уже занят';
					document.querySelector('.confirm').classList.add('error');   // ^ Добавляю окошко с ошибкой
				} else if(res.status == 402) {   // ^ Если почта уже существует
					event.target.email.value = "";   // ^ Обнуляю поле с почтой
					event.target.password.value = "";   // ^ Обнуляю пароль

					document.querySelector('.confirm').classList.remove('go');
					document.querySelector('.confirm').innerHTML = 'На этот email уже зарегистрирован аккаунт';
					document.querySelector('.confirm').classList.add('error');
				} else {   // ^ В противном случае вывожу ошибку
					let error = new Error(res.statusText);
					console.log(error);

					document.querySelector('.confirm').classList.remove('go');
					document.querySelector('.confirm').innerHTML = 'Неизвестная ошибка!';
					document.querySelector('.confirm').classList.add('error');
				}
			})
		})

	// ^ Ищем форму auth и Прослушиваем нажатие на кнопку submit
	document
		.getElementById("auth")
		.addEventListener("submit", (event) => {
			event.preventDefault();
			const login = event.target.login.value;
			const password = event.target.password_auth.value;

			// ^ создаем пакет который подет на адрес /auth методом post
			fetch("/auth", {
				method: "POST",
				headers: {   // ^ заголовки пакета
					Accept: "application/json",   // ^ разрешаем json
					"Content-Type": "application/json",   // ^ пишем тип контента json
				},
				// тело запроса
				body: JSON.stringify({
					login: login,
					password: password,
				}),
			}).then((res) => {
				if (res.status >= 200 && res.status < 300) {   // ^ Если всё хорошо
					document.querySelector('.confirm').classList.remove('error');
					document.querySelector('.confirm').classList.add('go');
					document.querySelector('.confirm').innerHTML = 'Вход выполнен успешно!';
					setTimeout( function(){
						document.location.href = "/profile";   // ^ Перенести в профиль через секунду
					},1000);
				} else if (res.status == 401) {   // ^ Если логин не найден в БД
					event.target.login.value = "";   // ^ Обнуляю логин
					event.target.password_auth.value = "";   // ^ Обнуляю пароль

					document.querySelector('.confirm').classList.remove('go');
					document.querySelector('.confirm').innerHTML = 'Пользователя ' + login + ' не существует!';
					document.querySelector('.confirm').classList.add('error');
				} else if (res.status == 409) {   // ^ Если пароль неверный
					event.target.password_auth.value = "";   // ^ Обнуляю пароль

					document.querySelector('.confirm').classList.remove('go');
					document.querySelector('.confirm').innerHTML = 'Пароль неверный';
					document.querySelector('.confirm').classList.add('error');
				} else {   // ^ В противном случае вывожу ошибку
					let error = new Error(res.statusText);
					console.log(error);

					document.querySelector('.confirm').classList.remove('go');
					document.querySelector('.confirm').innerHTML = 'Неизвестная ошибка!';
					document.querySelector('.confirm').classList.add('error');
				}
			});
		})
});