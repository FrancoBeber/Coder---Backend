import express, { response } from "express";
import { Router } from "express";
import ProductManager from "../../ProductManager.js";
const router = express.Router();
const filename = "./demo.json";
const productManager = new ProductManager(filename);
//const app = express();

router.use(express.json());

router.get("/", (req, res) => {
  let title = "Products";
  const result = +req.query.limit;
  if (!result) {
    let salida = productManager.getProducts();
    //res.send({ resultado: salida });
    res.render("home", { salida, title });
  } else {
    let nuevo;
    let arr;
    let salida;
    nuevo = productManager.getProducts();
    arr = Array.from(nuevo);
    salida = arr.slice(0, result);
    //res.send({ resultado: salida });
    res.render("home", { salida, title });
  }
});

router.get("/:id", (req, res) => {
  const id = +req.params.id;
  let datos = productManager.getProductById(id);
  if (!datos) {
    res.send("Producto no encontrado");
  } else {
    res.send({ resultado: datos });
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
  res.status(201).send({ mensaje: "Producto creeado", products });
});

router.put("/:id", (req, res) => {
  const id = +req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  const price = +req.body.price;
  const thumbnail = req.body.thumbnail;
  const code = req.body.code;
  const stock = +req.body.stock;
  const product = productManager.getProductById(id);
  if (!product) {
    return res.status(404).send({ message: "Producto no encontrado" });
  } else {
    productManager.updateProduct(
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    );
    const products = productManager.getProducts();
    res.status(202).send({ mensage: "Producto actualizado", products });
  }
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
/*

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
*/
//router.listen(8080, () => console.log("Server listening on port: 8080"));

export { router as productRouter };
