const { response } = require('express');
const express = require('express');   // ^ Подключаю express 
const { request } = require('http');
const path = require('path');   // ^ Для работы с путями
const sqlite = require('sqlite3');
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');

const db = new sqlite.Database(path.resolve(__dirname, "database", "forum.db"), err =>{
	if(err) {
		console.log(err);
	}
	else {
		console.log("Подключение к БД успешно!")
	}
});

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
app.use(bodyParser.json());   // ^ Парсер json объекта
app.use(bodyParser.urlencoded({ extended: true }));

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
	res.render(createPath('way'), {title});
	res.render(createPath('profile'), {title});
});

app.get('/reg', (req, res) => {
	const title = "Вход";
	res.render(createPath('authorization'), {title});
});

app.get('/discussions', (req, res) => {
	const title = "Обсуждение";
	res.render(createPath('way'), {title});
	res.render(createPath('discussions'), {title});
});

app.get('/gallery', (req, res) => {
	const title = "Галерея";
	res.render(createPath('way'), {title});
	res.render(createPath('gallery'), {title});
});

app.get('/wiki', (req, res) => {
	const title = "Википедия";
	res.render(createPath('way'), {title});
	res.render(createPath('wiki'), {title});
});

app.post('/register', (req, res) => {
	let user = false;   // ^ Есть ли пользователь

	const {login, email, password, date} = req.body;

	const salt = 7;   // ^ Соль
	let heshPassword;

	bcrypt.hash(password, salt, (error, hash) => {   // ^ Хэшируем пароль
		heshPassword = hash;

		db.all(`SELECT login, email FROM users`, (err, rows) => {   // ^ Перебор полей логина и майла
			if(rows !== null) {   // ^ Если есть записи в БД, перебрать БД
				rows.forEach(data => {
					if(data.login === login) {   // ^ Если существует логин
						user = true;
						res.status(401);
						res.end();   // ^ Закрываем сервер
					}
					else if(data.email === email) {   // ^ Если существует почта
						user = true;
						res.status(402);
						res.end();   // ^ Закрываем сервер
					}
				});
			} 
			if(!user) {   // ^ Создаём пользователя
				db.all(`INSERT INTO users ("login", "email", "password", "date_registration") VALUES("${login}", "${email}", "${heshPassword}", "${date}")`);
				res.status(200);
				res.end();   // ^ Закрываем сервер
			}
		});
	});
});


app.use((req, res) => {
	const title = "Ошибка";
	res
		.status(404)
		.render(createPath('error'), {title});
});