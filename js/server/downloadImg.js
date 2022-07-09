function downloadImg (input) {
    const file = input.files[0];

	const formdata = new FormData();
	formdata.append('file', file);

	fetch('/uploadImg', {
		method: 'post',
		credentials: 'include',
		headers: {
			Accept: 'application/json'
		},
		body: formdata,
	}).then((res) => {
		if (res.status >= 200 && res.status < 300) {   // ^ Если всё хорошо
			window.location.href = window.location.href;
		} else {   // ^ В противном случае вывожу ошибку
			console.log("Ошибка перемещения");
		}
	});
}