//app.js
const http = require("http");
const Todo = require("./controller");
const { getReqData } = require("./utils");

const PORT = process.env.PORT || 8080;
const HOST = "localhost";

const server = http.createServer(async (req, res) => {
    console.log("Called" + req.method + " : " + req.url);

    if (req.url === "/" && req.method === "GET") {
        // set the status code, and content-type
        res.writeHead(200, { "Content-Type": "application/json" });
        // send the data
        res.end("Welcome, this is your Home page\n");
    }

    //Health check and uptime endpoint
    else if (req.url === "/health" && req.method === "GET") {
        // console.log("Called GET : 0.0.0.0:8080/health");
        const healthcheck = {
            uptime: process.uptime(),
            message: "OK",
            timestamp: Date.now(),
        };
        res.end(JSON.stringify(healthcheck));
    }

    // /api/todos : GET
    else if (req.url === "/api/todos" && req.method === "GET") {
        // console.log("Called GET : 0.0.0.0:8080/api/todos");
        // get the todos.
        const todos = await new Todo().getTodos();
        // set the status code, and content-type
        res.writeHead(200, { "Content-Type": "application/json" });
        // send the data
        res.end(JSON.stringify(todos));
    }

    // /api/todos/:id : GET
    else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "GET") {
        // console.log("Called GET : 0.0.0.0:8080/api/todos/{id}");
        try {
            // get id from url
            const id = req.url.split("/")[3];
            // get todo
            const todo = await new Todo().getTodo(id);
            // set the status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });
            // send the data
            res.end(JSON.stringify(todo));
        } catch (error) {
            // set the status code and content-type
            res.writeHead(404, { "Content-Type": "application/json" });
            // send the error
            res.end(JSON.stringify({ message: error }));
        }
    }

    // /api/todos/:id : DELETE
    else if (
        req.url.match(/\/api\/todos\/([0-9]+)/) &&
        req.method === "DELETE"
    ) {
        // console.log("Called DELETE : 0.0.0.0:8080/api/todos/{id}");
        try {
            // get the id from url
            const id = req.url.split("/")[3];
            // delete todo
            let message = await new Todo().deleteTodo(id);
            // set the status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });
            // send the message
            res.end(JSON.stringify({ message }));
            //or response status = 204 if no response body is sent
               // res.writeHead(204, { "Content-Type": "application/json" }); 

        } catch (error) {
            // set the status code and content-type
            res.writeHead(404, { "Content-Type": "application/json" });
            // send the error
            res.end(JSON.stringify({ message: error }));
        }
    }

    // /api/todos/:id : UPDATE
    else if (
        req.url.match(/\/api\/todos\/([0-9]+)/) &&
        req.method === "PATCH"
    ) {
        // console.log("Called PATCH : 0.0.0.0:8080/api/todos/{id}");
        try {
            // get the id from the url
            const id = req.url.split("/")[3];
            // update todo
            let updated_todo = await new Todo().updateTodo(id);
            // set the status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });
            // send the message
            res.end(JSON.stringify(updated_todo));
        } catch (error) {
            // set the status code and content type
            res.writeHead(404, { "Content-Type": "application/json" });
            // send the error
            res.end(JSON.stringify({ message: error }));
        }
    }

    // /api/todos/ : POST
    else if (req.url === "/api/todos" && req.method === "POST") {
        // console.log("Called POST : 0.0.0.0:8080/api/todos");
        // get the data sent along
        let todo_data = await getReqData(req);
        // create the todo
        let todo = await new Todo().createTodo(JSON.parse(todo_data));
        // set the status code and content-type
        res.writeHead(201, { "Content-Type": "application/json" }); //was 200
        //send the todo
        res.end(JSON.stringify(todo));
    }

    // No route present
    else {
        console.warn(
            "This endpoint is not implemented / unavailable at the moment !!"
        );
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

server.listen(PORT, () => {
     console.log(`server started on ${HOST}  port: ${PORT}`);
});
