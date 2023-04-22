import express, { response } from "express";
import { Server } from "socket.io";
import { productRouter } from "./routes/products.router.js";
import { cartRouter } from "./routes/carts.router.js";
import handlebars from "express-handlebars";
import { routerViews } from "./routes/views.router.js";
import { realTimeProductRouter } from "./routes/realtimeproducts.router.js";
const PORT = 8080;
const app = express();
const serverHttp = app.listen(PORT, () =>
  console.log(`Server listening on port: ${PORT}`)
);
const __dirname = "./src";

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));
app.use("/", routerViews);
app.use("/products", productRouter);
app.use("/carts", cartRouter);
app.use("/realtimeproducts", realTimeProductRouter);

const serverSocket = new Server(serverHttp);

let log = [];

serverSocket.on("connection", (socket) => {
  console.log("Nuevo cliente conectado...");
  socket.on("delete", (arg) => {
    console.log(arg);
  });
  socket.on("create", (arg) => {
    console.log(arg);
    //log.push(arg);
    //serverSocket.emit("history", log);
  });
});
