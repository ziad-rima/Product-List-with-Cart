import Desserts from "./components/Desserts"
import Cart from "./components/Cart"
import FilledCart from "./components/FilledCart"
import { useState } from "react";
const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const handleSelectButton = (item) => {
    setCartItems((prevCartItems) => {
      let existingItem = prevCartItems.find(element => element.name === item.name)
        if (existingItem) {
            return prevCartItems.map(element => 
              element.name === item.name
              ? {...element, count: element.count++}
              : element
            )
        } else {
            return [...prevCartItems, {...item, count: 1}];
        }
    });
  }
  return (
    <div className='main-component'>
      <Desserts handleSelectButton={handleSelectButton} items={cartItems}/>
      {cartItems.length === 0 ? <Cart /> : <FilledCart items={cartItems} />}
    </div>
  )
}

export default App
