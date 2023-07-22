const express = require('express');
const ProductManager = require('./ProductManager'); 

const app = express();
const PORT = 8080; 

const productManager = new ProductManager('./products.json'); 


app.get('/products', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const products = await productManager.getProducts();

    if (!isNaN(limit)) {
      res.json(products.slice(0, limit));
    } else {
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos.' });
  }
});


app.get('/products/:pid', async (req, res) => {
  try {
    const pid = parseInt(req.params.pid);
    const product = await productManager.getProductById(pid);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto por ID.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});
