class ProductManager {
  #products;

  constructor() {
    this.#products = [];
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

  getElementById = (id) => {
    return this.#products.find(function (item) {
      return item.id === id;
    });
  };

  getElementByCode = (code) => {
    return this.#products.find(function (item) {
      return item.code === code;
    });
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
      }
    }
  };
}

const productManager = new ProductManager();
productManager.addProduct(
  "Producto1",
  "Producto para hacer algo",
  1500,
  "sdasd",
  "A123HJ",
  100
);
productManager.addProduct(
  "ProductoCodRepetido",
  "Producto para otra cosa",
  2500,
  "sdasd",
  "A123HP",
  200
);
productManager.addProduct(
  "Producto3",
  "Producto para buscar por id",
  2500,
  "sdasd",
  "A123555",
  200
);
productManager.addProduct(
  "ProductoCodigoRepetido",
  "Producto para comprobar campo code",
  2500,
  "sdasd",
  "A123555",
  200
);
productManager.addProduct(
  "ProductoIncompleto",
  "Producto para otra cosa",
  2500,
  "sdasd"
);
let producto33 = productManager.getElementById(3);
console.log("Buscando el elemento 3...");
console.log(producto33);
console.log("la lista de elementos es:");
console.log(productManager.getProducts());
