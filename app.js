// При запросе на url : 'http://localhost:8000/echo?message=FUCK' , на странице будет слово 'FUCK' или любое другое которое подставить в url поcле 'http://localhost:8000/echo?message='
// Если не указывать /echo?message= , то на ответ на странице будет "NO INFORMATION"

// Модули Nodejs http и url
const http = require("http");
const url = require("url");

//  localhost — это специальный частный адрес, с помощью которого компьютеры ссылаются на себя.
// Обычно оно эквивалентно внутреннему IP-адресу 127.0.0.1 и доступно только локальному компьютеру, но недоступно Интернету или локальным сетям, к которым подключен компьютер.
const host = "localhost";
// Порт — это числовое значение, которое серверы используют как точку доступа IP-адресу.
const port = 8000;

const requestListener = (req, res) => {
    // аргумент true, разберет  строку query в объект
    const urlParsed = url.parse(req.url, true);
    if (urlParsed.pathname == "/echo" && urlParsed.query.message) {
        res.writeHead(200);
        res.end(urlParsed.query.message);
    } else {
        res.writeHead(404);
        res.end("NO INFORMATION");
    }
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
