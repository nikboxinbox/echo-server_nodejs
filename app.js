const http = require("http");
const { parse } = require("querystring");
const host = "localhost";
// Порт — это числовое значение, которое серверы используют как точку доступа IP-адресу.
const port = 8000;

const requestListener = (req, res) => {
    let result = "";
    let body = "";
    req.on("data", (chunk) => {
        body += chunk.toString();
    });
    req.on("end", () => {
        let params = parse(body);
        result = params.say;

        res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
        res.end(
            '<form method="post"> <div> <label for="say"> Какой ответ ты ждешь ? </label> <input type="text" name="say"> <p><input type="submit"></p></div>' +
                "Ответ: " +
                result
        );
    });
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
// После создания сервера мы должны привязать его к сетевому адресу.
// Для этого мы используем метод server.listen(). Он принимает три аргумента: port, host и функцию обратного вызова, срабатывающую, когда сервер начинает прослушивание.
