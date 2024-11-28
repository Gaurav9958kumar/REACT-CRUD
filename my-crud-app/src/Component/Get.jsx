import React, { useEffect, useState } from "react";
import axios from "axios";

const Get = () => {
  const [data, setData] = useState([]);
  const initialProduct = {
    title: "",
    category: "",
    image: "",
  };
  const [editProduct, setEditProduct] = useState(initialProduct);
  const [editId, setEditId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const resp = await axios.get("https://fakestoreapi.com/products");
        setData(resp.data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`);
      const updatedData = data.filter((product) => product.id !== id);
      setData(updatedData);
      alert("Deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (product) => {
    setEditId(product.id);
    setEditProduct(product);
    setIsModalOpen(true); // Open the modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProduct({ ...editProduct, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.put(
        `https://fakestoreapi.com/products/${editId}`,
        editProduct
      );
      const updatedData = data.map((product) =>
        product.id === editId ? resp.data : product
      );
      setData(updatedData);
      alert("Product updated successfully");
      setIsModalOpen(false); // Close the modal
      setEditId(null);
      setEditProduct(initialProduct);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Product List</h2>
      {data.map((product) => (
        <div key={product.id}>
          <img src={product.image} alt={product.title} />
          <h3>{product.title}</h3>
          <p>{product.category}</p>
          <button onClick={() => handleDelete(product.id)}>DELETE</button>
          <button onClick={() => handleEdit(product)}>EDIT</button>
        </div>
      ))}

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Product</h2>
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={editProduct.title}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={editProduct.category}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={editProduct.image}
                onChange={handleInputChange}
              />
              <button type="submit">Update Product</button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Styles */}
      <style>
        {`
          .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }
          .modal-content {
            background: white;
            padding: 20px;
            border-radius: 8px;
            width: 300px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          .modal-content h2 {
            margin-top: 0;
          }
          .modal-content form input {
            display: block;
            width: 100%;
            margin-bottom: 10px;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
          .modal-content form button {
            margin-right: 10px;
            padding: 8px 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }
          .modal-content form button[type="submit"] {
            background: #4caf50;
            color: white;
          }
          .modal-content form button[type="button"] {
            background: #f44336;
            color: white;
          }
        `}
      </style>
    </div>
  );
};

export default Get;
