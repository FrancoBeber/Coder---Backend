import express, { response } from "express";
import { Router } from "express";
import ProductManager from "../../ProductManager.js";
const router = express.Router();
const filename = "./demo.json";
const productManager = new ProductManager(filename);
//const app = express();

router.use(express.json());

router.get("/", (req, res) => {
  let title = "Productos en tiempo real";
  const result = +req.query.limit;
  if (!result) {
    let salida = productManager.getProducts();
    //res.send({ resultado: salida });
    res.render("realTimeProducts", { salida, title });
  } else {
    let nuevo;
    let arr;
    let salida;
    nuevo = productManager.getProducts();
    arr = Array.from(nuevo);
    salida = arr.slice(0, result);
    //res.send({ resultado: salida });
    res.render("realTimeProducts", { salida, title });
  }
});

router.post("/", (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const price = +req.body.price;
  const thumbnail = req.body.thumbnail;
  const code = req.body.code;
  const stock = +req.body.stock;
  productManager.addProduct(title, description, price, thumbnail, code, stock);
  const products = productManager.getProducts();
  //res.status(201).send({ mensaje: "Producto creeado", products });
  res.render("realTimeProducts", { products, title });
});

router.delete("/:id", (req, res) => {
  const id = +req.params.id;
  const product = productManager.getProductById(id);
  if (!product) {
    return res.status(404).send({ message: "Producto no encontrado" });
  } else {
    productManager.deleteProduct(id);
    const products = productManager.getProducts();
    res.status(200).send({ mensage: "Producto eliminado", products });
  }
});

export { router as realTimeProductRouter };
