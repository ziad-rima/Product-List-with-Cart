import Desserts from "./components/Desserts"
import Cart from "./components/Cart"
import FilledCart from "./components/FilledCart"
import { useState } from "react";
const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const handleSelectButton = (item) => {
    setCartItems(prevCartItems => [...prevCartItems, item])
  }
  return (
    <div className='main-component'>
      <Desserts handleSelectButton={handleSelectButton}/>
      {cartItems.length === 0 ? <Cart /> : <FilledCart items={cartItems}/> }
    </div>
  )
}

export default App
