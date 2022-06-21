allDiv = 3;
function showDv(n) {
	for (i = 1; allDiv + 1 > i; i++) {
		document.getElementById('d' + i).style.display = 'none';
	}
	document.getElementById('d' + n).style.display = 'flex';
	return false;
}

// При загрузке страницы
window.addEventListener("DOMContentLoaded", () => {

	// Ищем форму register и Прослушиваем нажатие на кнопку submit
	document
		.getElementById("register")
		.addEventListener("submit", (event) => {
			event.preventDefault();
			const login = event.target.name.value;
			const email = event.target.email.value;
			const password = event.target.password.value;

			// создаем пакет который подет на адрес /register методом post
			fetch("/register", {
				method: "POST",
				headers: {   //заголовки пакета
					Accept: "application/json",   // разрешаем json
					"Content-Type": "application/json",   // пишем тип контента json
				},
				// тело запроса
				body: JSON.stringify({
					login: login,
					email: email,
					password: password,
				}),
			}).then((res) => {
				if (res.status >= 200 && res.status < 300) {
					document.location.href = "/profile";
				} else {
					let error = new Error(res.statusText);
					console.log(error);
				}
			})
		})

});