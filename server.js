const { response } = require('express');
const express = require('express');   // ^ Подключаю express 
const { request } = require('http');
const path = require('path');   // ^ Для работы с путями
const sqlite = require('sqlite3');
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // ~ Подключение пакета токена
const cors = require("cors");


const db = new sqlite.Database(path.resolve(__dirname, "database", "Forum.db"), err => {
	if (err) {
		console.log(err);
	}
	else {
		console.log("Подключение к БД успешно!")
	}
});

const app = express();

app.set('view engine', 'ejs');   // ^ Подключаю шаблонизатор

const PORT = 3000;   // ^ Порт 

const accessTokenSecret = 'youraccesstokensecret'; // ~  тут должен быть наш секретный ключ, как я поняла, можно придумать от балды

const createPath = (page) => path.resolve(__dirname, 'sample', `${page}.ejs`);   // ^ Функция создания полного пути до html файла

app.listen(PORT, (error) => {   // ^ Включаю прослушку порта
	error ? console.log(error) : console.log(`Прослушка на ${PORT} порту`);
});

app.use(express.static('styles'));   // ^ Общедоступная папка
app.use(express.static('sample'));   // ^ Общедоступная папка
app.use(express.static('images'));   // ^ Общедоступная папка
app.use(express.static('js'));   // ^ Общедоступная папка
app.use(bodyParser.json());   // ^ Парсер json объекта
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	const title = "Home";
	res.render(createPath('index'), { title });
});
app.get('/index', (req, res) => {
	const title = "Home";
	res.render(createPath('index'), { title });
});
app.get('/home', (req, res) => {
	const title = "Home";
	const discussions = [];
	db.all(`SELECT * FROM home_dis`, (err, rows) => {   // ^ Перебор полей логина и майла 
		rows.forEach(data => {   // ^ Перебираю БД
			if (rows !== null) {   // ^ Если есть записи в БД, перебрать БД
				discussions.push({   // ^ Добавляю ноый объект в массив описаний
					id: data.ID,
					author: data.author,
					date: data.date_public,
					theme: data.theme,
					discription: data.discription,
				})
			}
		});
		res.render(createPath('index'), { title, discussions });
	});
});

app.get('/profile', (req, res) => {
	const title = "Профиль";
	res.render(createPath('way'), { title });
	res.render(createPath('profile'), { title });
});

app.get('/reg', (req, res) => {
	const title = "Вход";
	res.render(createPath('authorization'), { title });
});

app.get('/discussions/:id', (req, res) => {
	const title = "Обсуждение";
	let id = req.params.id;   // ^ Получаю параметр id

	const user_disc = [];

	let discussions = {};
	db.all(`SELECT * FROM home_dis`, (err, rows) => {   // ^ Перебор полей таблицы 
		rows.forEach(data => {   // ^ Перебираю БД
			if (data.ID == id) {   // ^ Если есть записи в БД, перебрать БД
				discussions = {   // ^ Добавляю новый объект в массив описаний
					author: data.author,
					date: data.date_public,
					theme: data.theme,
					discription: data.discription,
				}
			}
		});
		db.all(`SELECT name FROM sqlite_master WHERE type='table' AND name='discussions_${id}'`, (err, rows) => {   // ^ Перебираю БД конкретной страницы
			if (rows.length === 0) {
				db.all(   // ^ Создаю таблицу
					`CREATE TABLE discussions_${id} (
					ID INTEGER PRIMARY KEY UNIQUE NOT NULL,
					date DATE NOT NULL,
					user VARCHAR NOT NULL,
					comment VARCHAR NOT NULL
					)`
				)

				res.render(createPath('way'), { title });
				res.render(createPath('discussions'), { title, discussions, user_disc });
			} else {
				db.all(`SELECT * FROM discussions_${id}`, (err, rows) => {
					rows.forEach(data => {   // ^ Перебираю БД
						if (rows !== null) {   // ^ Если есть записи в БД, перебрать БД
							user_disc.push({   // ^ Добавляю ноый объект в массив описаний
								id: data.ID,
								date: data.date,
								user_name: data.user,
								comment: data.comment,
							})
						}
					});
					res.render(createPath('way'), { title });
					res.render(createPath('discussions'), { title, discussions, user_disc });
				});
			}
		});
	});
});

app.get('/gallery', (req, res) => {
	const title = "Галерея";
	res.render(createPath('way'), { title });
	res.render(createPath('gallery'), { title });
});

app.get('/wiki', (req, res) => {
	const title = "Википедия";
	res.render(createPath('way'), { title });
	res.render(createPath('wiki'), { title });
});

app.post('/register', (req, res) => {
	let user = false;   // ^ Есть ли пользователь

	const { login, email, password, date } = req.body;

	const salt = 7;   // ^ Соль
	let heshPassword;

	bcrypt.hash(password, salt, (error, hash) => {   // ^ Хэшируем пароль
		heshPassword = hash;

		db.all(`SELECT login, email FROM user`, (err, rows) => {   // ^ Перебор полей логина и майла
			if (rows !== null) {   // ^ Если есть записи в БД, перебрать БД
				rows.forEach(data => {
					if (data.login === login) {   // ^ Если существует логин
						user = true;
						res.status(401);
						res.end();   // ^ Закрываем сервер
					}
					else if (data.email === email) {   // ^ Если существует почта
						user = true;
						res.status(402);
						res.end();   // ^ Закрываем сервер
					}
				});
			}
			if (!user) {   // ^ Создаём пользователя
				db.all(`INSERT INTO user ("login", "email", "password", "date_reg") VALUES("${login}", "${email}", "${heshPassword}", "${date}")`);
				res.status(200);
				res.end();   // ^ Закрываем сервер
			}
		});
	});
});

app.post('/auth', (req, res) => {
	let user = false;   // ^ Есть ли пользователь

	const { login, password } = req.body;   // ^ Получаю данные с полей

	db.all(`SELECT login, password FROM user`, (err, rows) => {   // ^ Перебор полей логина и майла
		rows.forEach(data => {   // ^ Перебираю БД
			if (rows !== null) {   // ^ Если есть записи в БД, перебрать БД
				if (data.login.toLowerCase() === login.toLowerCase()) {   // ^ Если нахожу совпадение с логином
					user = true;   // ^ Переназначаю bool

					bcrypt.compare(password, data.password, function (err, result) {   // ^ Расхэширую пароль
						if (result) {   // ^ Если верный
							res.status(200);
							res.end();
						} else {
							res.status(409);
							res.end();
						}
					});
				}
			} else {
				res.status(401);
				res.end();
			}
		});

		console.log(user);
		if (!user) {   // ^ Если пользователь не был найден
			res.status(401);
			res.end();
		}
	});
});


app.use((req, res) => {
	const title = "Ошибка";
	res
		.status(404)
		.render(createPath('error'), { title });
});

import isAuth from '../token/isAuth';
import attachCurrentUser from '../token/attachCurrentUser';
import ItemsModel from '../js/authorization';

export default (app) => {
	app.get('authorization', isAuth, attachCurrentUser, (req, res) => {
		const user = req.currentUser;

		const userItems = await ItemsModel.find({ owner: user._id });

		return res.json(userItems).status(200);
	})
}
