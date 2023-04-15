import express, { response } from "express";
import { Router } from "express";
import CartManager from "../../CartManager.js";

//const app = express();
const router = express.Router();
router.use(express.json());

const cartManager = new CartManager();

router.post("/", (req, res) => {
  const products = req.body;
  console.log(products);
  cartManager.addCart(products);
  const carts = cartManager.getCarts();
  res.status(201).send({ mensaje: "Producto creeado", carts });
});

router.get("/:id", (req, res) => {
  const id = +req.params.id;
  let datos = cartManager.getCartById(id);
  if (!datos) {
    res.send("Carro no encontrado");
  } else {
    res.send({ resultado: datos });
  }
});

router.post("/:cid/product/:pid", (req, res) => {
  const idc = +req.params.idc;
  const idp = +req.params.pid;
  cartManager.addProduct(idc, idp);
});

export { router as cartRouter };
