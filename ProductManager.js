import fs from "fs";
import { title } from "process";

class ProductManager {
  #products;
  #path;

  constructor(path) {
    this.#products = [];
    this.path = path;
  }

  #generateId = () => {
    let id;
    if (this.#products.length === 0) {
      id = 1;
    } else {
      id = this.#products[this.#products.length - 1].id + 1;
    }
    return id;
  };

  #validateField = (title, description, price, thumbnail, code, stock) => {
    let valor;
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      valor = 0;
      return valor;
    } else {
      valor = 1;
      return valor;
    }
  };

  #validateCode = (code) => {
    let repetido = this.getElementByCode(code);
    if (repetido == undefined) {
      return false;
    } else {
      return true;
    }
  };

  getProducts = () => {
    return this.#products;
  };

  getProductsFile = () => {
    let contenido = fs.readFileSync("./demo.json", "utf-8");
    contenido = JSON.parse(contenido);
    return contenido;
  };

  getElementById = (id) => {
    return this.#products.find(function (item) {
      return item.id === id;
    });
  };

  getElementByIdFile = (id) => {
    let contenido = fs.readFileSync("./demo.json", "utf-8");
    contenido = JSON.parse(contenido);
    return contenido.find(function (item) {
      return item.id === id;
    });
  };

  getElementByCode = (code) => {
    return this.#products.find(function (item) {
      return item.code === code;
    });
  };

  updateProduct = (id, title, description, price, thumbnail, code, stock) => {
    let contenido = fs.readFileSync("./demo.json", "utf-8");
    contenido = JSON.parse(contenido);
    let updatear = this.getElementById(id);
    updatear.title = title;
    updatear.description = description;
    updatear.price = price;
    updatear.thumbnail = thumbnail;
    updatear.code = code;
    updatear.stock = stock;
    contenido.push(updatear);
    fs.writeFileSync("./demo.json", JSON.stringify(updatear, null, "\t"));
  };

  delteProduct = (id) => {
    let contenido = fs.readFileSync("./demo.json", "utf-8");
    contenido = JSON.parse(contenido);
    let nuevo = contenido.filter((item) => item.id !== id);
    fs.writeFileSync("./demo.json", JSON.stringify(nuevo, null, "\t"));
  };

  addProduct = (title, description, price, thumbnail, code, stock) => {
    //validacion de no vacios
    let campos = this.#validateField(
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    );
    if (campos == 0) {
      console.error("Fail to add product. Incompleted fields.");
      return;
    } else {
      //validacion de no repetir codigo
      let repetidoCode = this.#validateCode(code);
      if (repetidoCode == true) {
        console.error("Fail to add product. Field Code duplicated.");
        return;
      } else {
        //Genero el id autoincremental
        let id = this.#generateId();
        //console.log(id);
        //Hago el push del producto
        let nuevoProducto = {
          id,
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
        };
        //console.log(nuevoProducto);
        this.#products.push(nuevoProducto);
        fs.writeFileSync(
          filename + "demo.json",
          JSON.stringify(this.#products, null, "\t")
        );
      }
    }
  };
}

const filename = "./";
const productManager = new ProductManager(filename);
productManager.addProduct(
  "Producto1",
  "Producto para hacer algo",
  1500,
  "sdasd",
  "A123HJ",
  100
);
productManager.addProduct(
  "Producto2",
  "Producto 2",
  2500,
  "iiii",
  "A123555",
  200
);
productManager.addProduct(
  "Producto3",
  "Producto 3",
  5000,
  "fffwew",
  "ZZ55U",
  200
);
productManager.addProduct(
  "Producto4",
  "Producto ",
  7000,
  "rrrrr",
  "L34Y78",
  600
);
productManager.delteProduct(2);
/*
productManager.updateProduct(
  3,
  "ProductoZ",
  "Producto modificado",
  4500,
  "prueba modificar",
  "NNN00O",
  100
);*/
//console.log("la lista de elementos es:");
//console.log(productManager.getProducts());
console.log("la lista de elementos es:");
console.log(productManager.getProductsFile());
console.log("el elemento con id 4 es: ");
console.log(productManager.getElementByIdFile(4));
