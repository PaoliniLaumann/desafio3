const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async addProduct(product) {
    try {
      const products = await this.getProductsFromFile();
      product.id = products.length + 1;
      products.push(product);
      await this.saveProductsToFile(products);
      console.log('Producto agregado exitosamente.');
    } catch (error) {
      console.error('Error al agregar el producto:', error);
    }
  }

  async getProducts() {
    try {
      const products = await this.getProductsFromFile();
      return products;
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      return [];
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProductsFromFile();
      const product = products.find((p) => p.id === id);
      return product;
    } catch (error) {
      console.error('Error al obtener el producto por ID:', error);
      return null;
    }
  }

  async updateProduct(id, updatedFields) {
    try {
      const products = await this.getProductsFromFile();
      const productIndex = products.findIndex((p) => p.id === id);
      if (productIndex !== -1) {
        products[productIndex] = { ...products[productIndex], ...updatedFields };
        await this.saveProductsToFile(products);
        console.log('Producto actualizado exitosamente.');
      } else {
        console.log('No se encontró un producto con el ID especificado.');
      }
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.getProductsFromFile();
      const updatedProducts = products.filter((p) => p.id !== id);
      await this.saveProductsToFile(updatedProducts);
      console.log('Producto eliminado exitosamente.');
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  }

  async getProductsFromFile() {
    try {
      const fileData = await fs.promises.readFile(this.path, 'utf-8');
      if (fileData) {
        return JSON.parse(fileData);
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error al leer el archivo de productos:', error);
      return [];
    }
  }

  async saveProductsToFile(products) {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
    } catch (error) {
      console.error('Error al guardar los productos en el archivo:', error);
    }
  }
}

module.exports = ProductManager;