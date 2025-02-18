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
              ? {...element, count: element.count + 1}
              : element
            )
        } else {
            return [...prevCartItems, {...item, count: 1}];
        }
    });
  }

  const incrementCount = (item) => {
    setCartItems((prevCartItems) => {
      return prevCartItems.map(element => 
        element.name === item.name
        ? {...element, count: element.count + 1}
        : element
      )
    })
  }

  const decrementCount = (item) => {
    setCartItems((prevCartItems) => {
      return prevCartItems.map(element => 
        element.name === item.name
        ? {...element, count: element.count - 1} 
        : element
      ).filter(element => element.count > 0)
      }
    )
  }

  return (
    <div className='main-component'>
      <Desserts 
        handleSelectButton={handleSelectButton} 
        items={cartItems} 
        incrementCount={incrementCount}
        decrementCount={decrementCount}
      />
      {cartItems.length === 0 ? <Cart /> : <FilledCart items={cartItems} />}
    </div>
  )
}

export default App
