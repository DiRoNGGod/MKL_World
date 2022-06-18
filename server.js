const express = require('express');   // ^ Подключаю express 
const path = require('path');   // ^ Для работы с путями

const app = express();

app.set('view engine', 'ejs');   // ^ Подключаю шаблонизатор

const PORT = 3000;   // ^ Порт 

const createPath = (page) => path.resolve(__dirname, 'sample', `${page}.ejs`);   // ^ Функция создания полного пути до html файла

app.listen(PORT, (error) => {   // ^ Включаю прослушку порта
	error ? console.log(error) : console.log(`Прослушка на ${PORT} порту`);
});

app.use(express.static('styles'));   // ^ Общедоступная папка
app.use(express.static('images'));   // ^ Общедоступная папка
app.use(express.static('js'));   // ^ Общедоступная папка

app.get('/', (req, res) => {
	const title = "Home";
	res.render(createPath('index'), {title});
});
app.get('/index', (req, res) => {
	const title = "Home";
	res.render(createPath('index'), {title});
});
app.get('/home', (req, res) => {
	const title = "Home";
	res.render(createPath('index'), {title});
});

app.get('/profile', (req, res) => {
	const title = "Профиль";
	res.render(createPath('profile'), {title});
});

app.get('/reg', (req, res) => {
	const title = "Вход";
	res.render(createPath('authorization'), {title});
});

app.get('/discussions', (req, res) => {
	const title = "Обсуждение";
	res.render(createPath('discussions'), {title});
});

app.get('/gallery', (req, res) => {
	const title = "Галерея";
	res.render(createPath('gallery'), {title});
});

app.use((req, res) => {
	const title = "Ошибка";
	res
		.status(404)
		.render(createPath('error'), {title});
});