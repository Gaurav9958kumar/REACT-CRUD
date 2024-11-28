import React, { useEffect, useState } from "react";
//https://fakestoreapi.com/products
import axios from "axios";
const Crud = () => {
  const initialProduct = {
    title: "",
    image: "",
    price: "",
    category: "",
  };
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [newEditedProduct, setnewEditedProduct] = useState(initialProduct);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState(initialProduct);
  useEffect(() => {
    const fetchAPi = async () => {
      try {
        const resp = await axios.get("https://fakestoreapi.com/products");
        setData(resp.data);
      } catch (error) {}
    };
    fetchAPi();
  }, []);
  const handleEdit = (product) => {
    setEditId(product.id);
    setnewEditedProduct(product);
    setIsModalOpen(true);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setnewEditedProduct({ ...newEditedProduct, [name]: value });
    setNewProduct({...newProduct,[name]:value})
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.put(
        `https://fakestoreapi.com/products/${editId}`,
        newEditedProduct
      );
      const updatedData = data.map((product) =>
        product.id === editId ? newEditedProduct : product
      );
      setData(updatedData);
      alert("product updated successfully");
      setEditId(null);
      setIsModalOpen(false);
      setnewEditedProduct(initialProduct);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
        const resp=await axios.post("https://fakestoreapi.com/products",newProduct)
        setData([...data,resp.data])
        alert("product added successfully")
        setNewProduct(initialProduct)
    } catch (error) {
        console.log(error)
    }
  }
  const handleDelete = async (id) => {
    try {
      const resp = await axios.delete(
        `https://fakestoreapi.com/products/${id}`
      );
      const updatedData = data.filter((product) => product.id !== id);
      setData(updatedData);
      alert("product deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="url" onChange={handleInputChange} name="image" id="" value={newProduct.image} />
          <input type="text" onChange={handleInputChange} name="title" id="" value={newProduct.title} />
          <input type="text" onChange={handleInputChange} name="category" id=""value={newProduct.category} />
          <input type="number" onChange={handleInputChange} name="price" id="" value={newProduct.price}/>
          <input type="submit"/>
        </form>
      </div>
      {data.map((product) => (
        <div key={product.id}>
          <img src={product.image} alt="" />
          <h1>{product.title}</h1>
          <p>{product.category}</p>
          <p>{product.price}</p>
          <button onClick={() => handleEdit(product)}>Edit</button>
          <button onClick={() => handleDelete(product.id)}>Delete</button>
        </div>
      ))}

      {isModalOpen && (
        <div
          style={{
            width: "100%",
            height: "100%",
            border: "5px solid red",
            position: "fixed",
            left: 0,
            top: 0,
            padding: "20px",
            // background:"white"
          }}
        >
          <div
            style={{
              width: "300px",
              height: "200px",
              margin: "auto",
              marginTop: "200px",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              background: "white",
              padding: "40px",
            }}
          >
            <form onSubmit={handleSubmitForm}>
              <input
                type="url"
                onChange={handleInputChange}
                name="image"
                id=""
                value={newEditedProduct.image}
              />
              <input
                type="text"
                onChange={handleInputChange}
                name="title"
                id=""
                value={newEditedProduct.title}
              />
              <input
                type="text"
                onChange={handleInputChange}
                name="category"
                id=""
                value={newEditedProduct.category}
              />
              <input
                type="number"
                onChange={handleInputChange}
                name="price"
                id=""
                value={newEditedProduct.price}
              />
              <input type="submit" />
            </form>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Crud;
