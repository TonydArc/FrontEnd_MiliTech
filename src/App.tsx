import './App.css'
import Footer from './component/footer'
import Navbar from './component/navbar'
import { Route, Routes } from "react-router-dom"
import Home from './page/home'
import Error from './page/404'
import About from './page/about'
import Login from './page/login'
import Signup from './page/signup'
import Cart from './page/cart'
import Checkout from './page/checkout'
import Productdetail from './page/productdetail'
import Order from './page/Order'

function App() {
  return (
    <>
      <Navbar/>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<Order/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/detail/:id' element={<Productdetail/>}/>
        <Route path='*' element={<Error/>}/>
      </Routes>

      <Footer/>
    </>
  )
}

export default App
