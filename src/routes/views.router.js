import express, { response } from "express";
import { Router } from "express";
import ProductManager from "../../ProductManager.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {});
});

export { router as routerViews };
