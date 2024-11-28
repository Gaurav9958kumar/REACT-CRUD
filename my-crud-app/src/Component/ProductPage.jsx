import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://fakestoreapi.com/products";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });
  const [editProduct, setEditProduct] = useState(null);
// hello
  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add a new product
  const handleAddProduct = async () => {
    try {
      const response = await axios.post(API_URL, newProduct);
      setProducts([...products, response.data]);
      setNewProduct({
        title: "",
        price: "",
        description: "",
        category: "",
        image: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Delete a product
  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Update a product
  const handleUpdateProduct = async () => {
    try {
      await axios.put(`${API_URL}/${editProduct.id}`, editProduct);
      setProducts(
        products.map((product) =>
          product.id === editProduct.id ? editProduct : product
        )
      );
      setEditProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div>
      <h1>FakeStore Product Page</h1>

      {/* Add New Product */}
      <div>
        <h2>Add New Product</h2>
        <input
          type="text"
          placeholder="Title"
          value={newProduct.title}
          onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) =>
            setNewProduct({ ...newProduct, category: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      {/* Edit Product */}
      {editProduct && (
        <div>
          <h2>Edit Product</h2>
          <input
            type="text"
            placeholder="Title"
            value={editProduct.title}
            onChange={(e) =>
              setEditProduct({ ...editProduct, title: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Price"
            value={editProduct.price}
            onChange={(e) =>
              setEditProduct({ ...editProduct, price: e.target.value })
            }
          />
          <textarea
            placeholder="Description"
            value={editProduct.description}
            onChange={(e) =>
              setEditProduct({ ...editProduct, description: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Category"
            value={editProduct.category}
            onChange={(e) =>
              setEditProduct({ ...editProduct, category: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Image URL"
            value={editProduct.image}
            onChange={(e) =>
              setEditProduct({ ...editProduct, image: e.target.value })
            }
          />
          <button onClick={handleUpdateProduct}>Update Product</button>
          <button onClick={() => setEditProduct(null)}>Cancel</button>
        </div>
      )}

      {/* Product List */}
      <div>
        <h2>Product List</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <h3>{product.title}</h3>
              <p>Price: ${product.price}</p>
              <p>{product.description}</p>
              <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              <button onClick={() => setEditProduct(product)}>Edit</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductPage;

