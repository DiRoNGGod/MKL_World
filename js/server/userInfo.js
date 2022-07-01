window.addEventListener("DOMContentLoaded", () => {   // ^ При загрузке страницы

	// ^ Ищем форму auth и Прослушиваем нажатие на кнопку submit
	document
		.getElementById("info__form")
		.addEventListener("submit", (event) => {
			event.preventDefault();
			const name = event.target.userName.value;
			const birthday = event.target.userDate.value;
			const sex = event.target.userSex.value;
			const about = event.target.userComment.value;

			// ^ создаем пакет который подет на адрес /update методом post
			fetch("/update", {
				method: "POST",
				headers: {   // ^ заголовки пакета
					Accept: "application/json",   // ^ разрешаем json
					"Content-Type": "application/json",   // ^ пишем тип контента json
				},
				// ^ тело запроса
				body: JSON.stringify({
					name: name,
					birthday: birthday,
					sex: sex,
					about: about,
				}),
			}).then((res) => {
				if (res.status >= 200 && res.status < 300) {   // ^ Если всё хорошо
					console.log("Сохранение выполнено!")
				} else {   // ^ В противном случае вывожу ошибку
					console.log("Произошла ошибка");
				}
			});
		})
});