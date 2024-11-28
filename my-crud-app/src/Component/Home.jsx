import React, { useEffect, useState } from "react";
import axios from "axios";
//https://fakestoreapi.com/products
const Home = () => {
  const [data, setData] = useState([]);
 const users={
    title:"",
    category:"",
    price:"",
    image:"",
    rating:{rate:0,count:0}
 }
 const [newData,setNewData]=useState(users)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setData(response.data);

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`);

      const updatedData = data.filter((products) => products.id !== id);
      setData(updatedData);
      alert("data deleted ssuccessfully");
    } catch (error) {
      console.log(error);
    }
  };
  const handlechange=(e)=>{
    const {name,value}=e.target;
    setNewData({...newData,[name]:value})
    // console.log(newData)
  }
const addProduct=async(e)=>{
  e.preventDefault()
   try {
      const resp=await axios.post("https://fakestoreapi.com/products",newData)
      setData([...data,resp.data])
      alert("product added successfully")
      setData(users)
   } catch (error) {
    console.log(error)
   }
}
  
  return (
    <div>
      <form onSubmit={addProduct}>
        <input type="text" name="title" id="" onChange={handlechange} />
        <input type="text" name="category" id="" onChange={handlechange}/>
        <input type="number" name="price" id="" onChange={handlechange}/>
        <input type="submit" name="" id="" />
      </form>

      {data.map((products) => (
        <div key={products.id}>
          <img src={products.image} alt="" />

          <h1>{products.title}</h1>
          <p>{products.category}</p>
          <p>{products.price}</p>
          <p>
            Rating:{products.rating?.rate || 0} {products.rating?.count || 0}
            Reviews
          </p>
          <button onClick={() => handleDelete(products.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Home;
