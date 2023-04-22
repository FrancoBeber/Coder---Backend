import express, { response } from "express";
import { productRouter } from "./routes/products.router.js";
import { cartRouter } from "./routes/carts.router.js";
import handlebars from "express-handlebars";
import { routerViews } from "./routes/views.router.js";
import { realTimeProductRouter } from "./routes/realtimeproducts.router.js";
const app = express();
const __dirname = "./src";

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));
app.use("/", routerViews);
app.use("/products", productRouter);
app.use("/carts", cartRouter);
app.use("/realtimeproducts", realTimeProductRouter);
app.listen(8080, () => console.log("Server listening on port: 8080"));
