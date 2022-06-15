const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((request, response) => {
	response.setHeader("Content-Type", "text/html");

	const createPath = (page) => path.resolve(__dirname, `${page}.html`);

	console.log(path.resolve(__dirname));

	let basePath = "";

	switch (request.url) {
		case "/":
			basePath = createPath("index");
			response.statusCode = 200;
			break;
		case "/profile":
			basePath = createPath("profile");
			response.statusCode = 200;
			break;
		case "/reg":
			basePath = createPath("authorization");
			response.statusCode = 200;
			break;
		case "/gallery":
			basePath = createPath("gallery");
			response.statusCode = 200;
			break;
		default:
			basePath = createPath("error");
			response.statusCode = 404;
			break;
	}

	fs.readFile(basePath, (err, data) => {
		if(err) {
			response.statusCode = 500;
			response.end();
		}
		else {
			response.write(data);
			response.end();
		}
	});
});

server.listen(PORT, (error) => {
	if(error) {
		console.log(error);
	}
	else {
		console.log("Прослушиваю сервер");
	}
});