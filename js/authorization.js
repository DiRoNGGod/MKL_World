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

