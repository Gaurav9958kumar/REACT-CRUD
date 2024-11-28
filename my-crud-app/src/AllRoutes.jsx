import React from 'react'
import Home from './Component/Home'
import {Routes,Route} from 'react-router-dom'
import ProductPage from './Component/ProductPage'
import Get from './Component/Get'
import Update from './Component/Update'
import Crud from './Component/Crud'
const AllRoutes = () => {
  return (
     <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product' element={<ProductPage/>}/>
        <Route path='/get' element={<Get/>}/>
        <Route path='/update' element={<Update/>}/>
        <Route path='/crud' element={<Crud/>}/>
     </Routes>
  )
}

export default AllRoutes
