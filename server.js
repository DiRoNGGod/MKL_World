// ? ======== Библиотеки Node.js =========
const { response } = require('express');
const express = require('express');
const { request } = require('http');
const path = require('path');
const sqlite = require('sqlite3');
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

// ? ======== Методы других скриптов =========
const {jwtSecret} = require("./server/config.js");
const authMiddle = require("./server/authMiddleware");


const app = express();   // ^ Подключаю exspress

const PORT = process.env.PORT || 3000;   // ^ Порт 

const db = new sqlite.Database(path.resolve(__dirname, "database", "Forum.db"), err => {   // ^ Подключение к БД
	err ? console.log(`Ошибка: ${err}, во время запуска БД`) : console.log("Подключение к БД успешно!");
});

app.listen(PORT, (err) => {   // ^ Включаю сервер
	err ? console.log(err) : console.log(`Прослушка на ${PORT} порту`);
});

const createPath = (page) => path.resolve(__dirname, 'sample', `${page}.ejs`);   // ^ Функция пути до ejs файла


app.set('view engine', 'ejs');   // ^ Подключаю шаблонизатор

app.use(express.static('styles'));   // ^ Общедоступная папка
app.use(express.static('images'));   // ^ Общедоступная папка
app.use(express.static('js'));   // ^ Общедоступная папка

app.use(bodyParser.json());   // ^ Парсер json объекта
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());   // ^ Парсер cookies

// ~ ================= Основная страница ===================

app.get('/', (req, res) => {
	const title = "Home";
	let actions;
	let user = {};

	const discussions = [];   // ^ Массив для записей БД

	const token = req.cookies.token;   // ^ Получаю токен из куки

	if (token) {
		const userToken = jwt.verify(token, jwtSecret);
		user = {   // ^ Получаю объект пользователя
			status: userToken.status,
			login: userToken.login,
		};

		actions = "Выход";
	} else {
		actions = "Вход";
	}

	db.all(`SELECT * FROM home_dis`, (err, rows) => {   // ^ Перебор полей логина и майла 
		rows.forEach(data => {   // ^ Перебираю БД
			discussions.push({   // ^ Добавляю ноый объект в массив описаний
				id: data.ID,
				author: data.author,
				date: data.date_public,
				theme: data.theme,
				discription: data.discription,
			});
		});
		res.render(createPath('index'), { title, actions, discussions, user });
	});
});

// ~ ================= Страница отдельных обсуждений ===================

app.get('/discussions/:id', (req, res) => {
	const title = "Обсуждение";
	
	let id = req.params.id;   // ^ Получаю параметр id

	const user_disc = [];   // ^ Массив информации о пользователях
	let discussions = {};   // ^ Объект отдельного обсуждения

	db.all(`SELECT * FROM home_dis`, (err, rows) => {   // ^ Перебор полей таблицы 
		rows.forEach(data => {
			if (data.ID == id) {   // ^ Ищу номер обсуждения
				discussions = {   // ^ Сохраняю данные обсуждения
					author: data.author,
					date: data.date_public,
					theme: data.theme,
					discription: data.discription,
				}
			}
		});

		db.all(`SELECT name FROM sqlite_master WHERE type='table' AND name='discussions_${id}'`, (err, rows) => {   // ^ Проверка на существование БД, конкретно страницы
			if (rows.length === 0) {   // ^ Если БД нет
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
			} else {   // ^ Если таблица уже имеется
				db.all(`SELECT * FROM discussions_${id}`, (err, rows) => {
					rows.forEach(data => {   // ^ Перебираю БД
						user_disc.push({   // ^ Добавляю ноый объект в массив описаний
							id: data.ID,
							date: data.date,
							user_name: data.user,
							comment: data.comment,
						});
					});
					res.render(createPath('way'), { title });
					res.render(createPath('discussions'), { title, discussions, user_disc });
				});
			}
		});
	});
});

// ~ ================= Страница авторизации/регистрация ===================

app.get('/reg', (req, res) => {   // ^ Страница авторизации
	const title = "Вход";

	const token = req.cookies.token;

	if (token) {   // ^ Если есть токен, удалить
		res.clearCookie("token");
		res.redirect("/");
	} else {
		res.render(createPath('authorization'), { title });
	}
});

// ~ ================= Cтраница профиля(TOKEN) ===================

app.get('/profile/:login', authMiddle, (req, res) => {
	const title = "Профиль";

	let login = req.params.login;   // ^ Получаю параметр login
	let isTrueEdit   // ^ Подтверждение пользоателя

	const token = req.cookies.token;   // ^ Получаю токен из куки
	const userToken = jwt.verify(token, jwtSecret);

	let user = {   // ^ Получаю объект пользователя
		status: userToken.status,
		login: userToken.login,
	};

	db.all(`SELECT * FROM user WHERE login="${login}"`, (err, rows) => {   // ^ Проверка на существование БД, конкретно страницы
		if (rows.length === 0) {   // ^ Если БД нет
			res.redirect("/");
		} else {
			rows.forEach(data => {   // ^ Перебираю БД
				let userInfo = {   // ^ Добавляю ноый объект в массив описаний
					login: data.login,
					name: data.name,
					birthday: data.birthday,
					sex: data.sex,
					about: data.comment,
					data_reg: data.date_reg,
				};

				if(login != user.login) {   // ^ Проверяю чей профиль
					isTrueEdit = false;
				} else {
					isTrueEdit = true;
				}

				res.render(createPath('way'), { title });
				res.render(createPath('profile'), { title, userInfo , user, isTrueEdit});
			});
		}
	});
});

// ~ ================= Страница галереи ===================

app.get('/gallery', (req, res) => {
	const title = "Галерея";

	let user = {
		status: "0",
	};

	const token = req.cookies.token;   // ^ Получаю токен из куки

	if (token) {
		const userToken = jwt.verify(token, jwtSecret); 
		user = {   // ^ Получаю объект пользователя
			status: userToken.status,
			login: userToken.login.toLowerCase(),
		};
	}

	res.render(createPath('way'), { title });
	res.render(createPath('gallery'), { title, user });
});

// ~ ================= Страница википедии ===================

app.get('/wiki', (req, res) => {
	const title = "Википедия";

	let user = {
		status: "0",
	};

	const token = req.cookies.token;   // ^ Получаю токен из куки

	if (token) {
		const userToken = jwt.verify(token, jwtSecret);

		user = {   // ^ Получаю объект пользователя
			status: userToken.status,
			login: userToken.login.toLowerCase(),
		};
	}

	res.render(createPath('way'), { title });
	res.render(createPath('wiki'), { title, user });
});

// ~ ================= Cтраница админ-панели(TOKEN) ===================

app.get('/admin', authMiddle, (req, res) => {
	const title = "Админ-панель";

	const users = [];   // ^ Массив пользователей

	db.all(`SELECT ID, email, login, name, status FROM user`, (err, rows) => {   // ^ Перебор БД
		rows.forEach(data => {
			users.push({   // ^ Добавляю ноый объект в массив описаний
				id: data.ID,
				email: data.email,
				login: data.login,
				name: data.name,
				status: data.status,
			})
		});

		res.render(createPath('admin'), { title, users});
	});
});

// ! ================= Запрос на регистрацию ===================

app.post('/register', (req, res) => {
	let user = false;   // ^ Есть ли пользователь
	const rights = 0;   // ^ Роль пользователя

	const { login, email, password, date } = req.body;   // ^ Получаю данные из формы

	const salt = 7;   // ^ Соль

	bcrypt.hash(password, salt, (error, hash) => {   // ^ Хэшируем пароль
		const heshPassword = hash;

		db.all(`SELECT login, email FROM user`, (err, rows) => {   // ^ Перебор полей БД
			if (rows === 0) {   // ^ Если БД пустая
				res.status(401).end();
			} else {
				rows.forEach(data => {
					if (data.login.toLowerCase() === login.toLowerCase()) {   // ^ Если существует логин
						user = true;
						res.status(401).end();
					} 
					else if (data.email.toLowerCase() === email.toLowerCase()) {   // ^ Если существует почта
						user = true;
						res.status(402).end();
					}
				});
			}
			if (!user) {   // ^ Если пользователя нет - создаём пользователя
				db.all(`INSERT INTO user ("login", "email", "password", "date_reg", "status") VALUES("${login}", "${email}", "${heshPassword}", "${date}", "${rights}")`, (err) => {
					db.all(`SELECT status FROM user WHERE login="${login}"`, (err, rows) => {   // ^ Перебор полей БД
						if (rows === 0) {   // ^ Если БД пустая
							res.status(401);
							res.end();
						} else {
							const token = jwt.sign({login: login, status: rows[0].status}, jwtSecret);  // ^ Создаём токен
							res.cookie("token", token).end();   // ^ Помещаем токен в cookie
						}
					});
				});   // ^ Записываем пользователя в БД
			}
		});
	});
});

// ! ================= Запрос на авторизацию ===================

app.post('/auth', (req, res) => {
	let user = false;

	const { login, password } = req.body;   // ^ Получаю с формы

	db.all(`SELECT login, password FROM user`, (err, rows) => {   // ^ Перебор полей логина и майла
		if (rows === 0) {   // ^ Если БД пустая
			res.status(401);
			res.end();
		} else {
			rows.forEach(data => {
				if (data.login.toLowerCase() === login.toLowerCase()) {   // ^ Если нахожу совпадение с логином
					user = true;

					bcrypt.compare(password, data.password, function(err, result) {   // ^ Расхэширую пароль
						if(result) {   // ^ Если верный
							db.all(`SELECT status FROM user WHERE login="${login}"`, (err, rows) => {   // ^ Перебор полей БД
								if (rows === 0) {   // ^ Если БД пустая
									res.status(401).end();
								} else {
									const token = jwt.sign({login: login, status: rows[0].status}, jwtSecret);  // ^ Создаём токен
									res.cookie("token", token).end();   // ^ Помещаем токен в cookie
								}
							});
						} else {   // ^ Если пароль не верный
							res.status(409).end();
						}
					});
				}
			});
		}

		if (!user) {   // ^ Если такого логина не существует   
			res.status(401);
			res.end();
		}
	});
});

// ! ================= Запрос на удаление(Админ-панель) ===================

app.post('/deluserAdmin', (req, res) => {
	const {id} = req.body;   // ^ Получаю данные о id конкретного пользователя

	db.all(`DELETE FROM user WHERE id="${id}";`, (err) => {   // ^ Удаляю пользователя
		res.end();
	});
});

// ! ================= Запрос на удаление(Профиль) ===================

app.post('/deluser', (req, res) => {
	const token = req.cookies.token;   // ^ Получаю токен из куки
	const user = jwt.verify(token, jwtSecret);

	const login = user.login;

	db.all(`DELETE FROM user WHERE login="${login}";`, (err) => {   // ^ Удаляю пользователя
		if (err) {
			console.log(err);
		} else {
			res.clearCookie("token");
			res.redirect("/");
		}
	});
});

// ! ================= Запрос на обновление данных(Профиль) ===================

app.post('/update', (req, res) => {
	const {name, birthday, sex, about} = req.body;   // ^ Получаю данные о конкретном пользователе

	const token = req.cookies.token;   // ^ Получаю токен из куки
	const user = jwt.verify(token, jwtSecret);

	const login = user.login;

	db.all(`UPDATE user SET name = "${name}", birthday = "${birthday}", sex = "${sex}", comment = "${about}" WHERE login = "${login}"`, (err) => {   // ^ Обновляю пользователя
		if (err) {
			console.log(err);
		} else {
			res.end();
		}
	});
});

// ! ================= Запрос на обновление фотографии(Профиль) ===================

app.post('/uploadImg', (req, res) => {
    
});

// todo ================== Страница ошибки ======================

app.use((req, res) => {
	const title = "Ошибка";

	res
		.status(404)
		.render(createPath('error'), { title });
});
