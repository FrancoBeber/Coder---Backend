import express, { response } from "express";
import ProductManager from "./ProductManager.js";

const filename = "./demo.json";
const productManager = new ProductManager(filename);
const app = express();

app.get("/", (req, res) => {
  res.send(
    "Bienvenido... para consultar productos ingrese a la ruta /products"
  );
});

app.get("/products", (req, res) => {
  const result = +req.query.limit;
  if (!result) {
    let salida = productManager.getProducts();
    res.send({ resultado: salida });
  } else {
    let nuevo;
    let arr;
    let salida;
    nuevo = productManager.getProducts();
    arr = Array.from(nuevo);
    salida = arr.slice(0, result);
    res.send({ resultado: salida });
  }
  //res.send({ resultado: salida });
});

app.get("/products/:id", (req, res) => {
  const id = +req.params.id;
  let datos = productManager.getProductById(id);
  if (!datos) {
    res.send("Producto no encontrado");
  } else {
    res.send({ resultado: datos });
  }
});

app.listen(8080, () => console.log("Server Up"));
