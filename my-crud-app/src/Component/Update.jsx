import React, { useEffect, useState } from "react";
// https://fakestoreapi.com/products
import axios from "axios";
const Update = () => {
  const [data, setData] = useState([]);
  const initialProduct = {
    title: "",
    image: "",
    category: "",
  };
  const [newEditedProduct, setNewEditedProduct] = useState(initialProduct);
  const [editedProdcutId, setEditedProductId] = useState(null);
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


const handleEdit = (product) => {
    setEditedProductId(product.id);
    setNewEditedProduct(product);
    setIsModalOpen(true);
  };

  const handleInputChange=(e)=>{
     const {name,value}=e.target
     setNewEditedProduct({...newEditedProduct,[name]:value})
  }
  const handleEditSubmit=async(e)=>{
     e.preventDefault()
    try {
        const resp=await axios.put(`https://fakestoreapi.com/products/${editedProdcutId}`,newEditedProduct)
        console.log(resp)
        const updatedData=data.map((product)=>product.id===editedProdcutId ? newEditedProduct : product)
        setData(updatedData)
        alert("Product updated successfully");
        setIsModalOpen(false);
        setEditedProductId(null)
        setNewEditedProduct(initialProduct)
    } catch (error) {
        console.log(error)
    }

  
  }
  return (
    <div>
      {data.map((product) => (
        <div key={product.id}>
          <img src={product.image} alt="" />
          <h1>{product.title}</h1>
          <p>{product.category}</p>
          <button onClick={() => handleEdit(product)}>Edit</button>
        </div>
      ))}

      {isModalOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%" ,backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div style={{ margin: "100px auto", padding: "20px", background: "#fff", width: "400px" }}>
            <form onSubmit={handleEditSubmit}>
              <input type="text" onChange={handleInputChange} name="title" id="" value={newEditedProduct.title} />
              <input type="text" onChange={handleInputChange} name="category" id="" value={newEditedProduct.category}/>
              <input type="text" onChange={handleInputChange} name="image" id="" value={newEditedProduct.image}/>
              <input type="submit"  id="" />
            </form>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
         
    </div>
  );
};

export default Update;
