function deleteAcc() {
	fetch("/deluserAdmin", {
		method: "POST",
		headers: {   // ^ заголовки пакета
			Accept: "application/json",   // ^ разрешаем json
			"Content-Type": "application/json",   // ^ пишем тип контента json
		},
		// тело запроса
		body: JSON.stringify({
			id: id,   // ^ id берётся из admin.js(92)
		}),
	}).then((res) => {
		if (res.status >= 200 && res.status < 300) {   // ^ Если всё хорошо
			editButton.classList.remove('active');
		} else {   // ^ В противном случае вывожу ошибку
			let error = new Error(res.statusText);
			console.log(error);
		}
	});
}

function deleteUser() {
	fetch("/deluser", {
		method: "POST",
	}).then((res) => {
		if (res.status >= 200 && res.status < 300) {   // ^ Если всё хорошо
			setTimeout(() => {
				document.location.href = "/";
			}, 1000);
		} else {   // ^ В противном случае вывожу ошибку
			let error = new Error(res.statusText);
			console.log(error);
		}
	});
}