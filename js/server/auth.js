window.addEventListener("DOMContentLoaded", () => {   // ^ При загрузке страницы

	console.log("Страница загрузилась!")

	// ^ Ищем форму auth и Прослушиваем нажатие на кнопку submit
	document
		.getElementById("auth")
		.addEventListener("submit", (event) => {
			console.log("Произошёл сабмит!")
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
				// ^ тело запроса
				body: JSON.stringify({
					login: login,
					password: password,
				}),
			}).then((res) => {
				if (res.status >= 200 && res.status < 300) {   // ^ Если всё хорошо
					document.querySelector('.confirm').classList.remove('error');
					document.querySelector('.confirm').classList.add('go');
					document.querySelector('.confirm').innerHTML = 'Вход выполнен успешно!';
					setTimeout(function () {
						document.location.href = "/profile/" + login;   // ^ Перенести в профиль через секунду
					}, 1000);
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