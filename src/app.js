import express, { response } from "express";
import { productRouter } from "./routes/products.router.js";
import { cartRouter } from "./routes/carts.router.js";
const app = express();

app.use(express.static("public"));
app.use("/products", productRouter);
app.use("/carts", cartRouter);

app.listen(8080, () => console.log("Server listening on port: 8080"));
