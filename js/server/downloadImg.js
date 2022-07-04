function downloadImg(input) {
	const file = input.files[0];

	const formdata = new FormData();
	formdata.append('file', file);

	fetch('/uploadImg', {
		method: 'POST',
		body: formdata,
	}).then(res => {
		if (res.status >= 200 && res.status < 300) {   // ^ Если всё хорошо
			console.log("Сохранение выполнено!");
		} else {   // ^ В противном случае вывожу ошибку
			console.log("Произошла ошибка");
		}
	})
}