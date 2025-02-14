# Frontend Mentor - Product list with cart solution

This is a solution to the [Product list with cart challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)


## Overview

### The challenge

Users should be able to:

- Add items to the cart and remove them
- Increase/decrease the number of items in the cart
- See an order confirmation modal when they click "Confirm Order"
- Reset their selections when they click "Start New Order"
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./screenshot.jpg)


### Links

## My process

For this project, I followed the mobile-first workflow, where I created the following components:
- `App.jsx`
- `Desserts.jsx`
- `Dessert.jsx`
- `Cart.jsx`
- `AddToCart.jsx` and `EmptyCart.jsx` (both are svg icons).

in `Desserts.jsx`, I mapped over the data in the `data.json` file (which is an array of objects) and passed each object as a prop to `Dessert.jsx`:

`Desserts.jsx`:
```jsx
import Dessert from "./Dessert"
import data from '../../data.json'
const Desserts = (props) => {
  return (
    <div className='desserts-component'>
        <h1 className="desserts-title red-hat-text">Desserts</h1>
        {data.map((entry) => {
            return <Dessert 
                    key={entry.category} 
                    image={entry.image}
                    name={entry.name}
                    category={entry.category}
                    price={entry.price}
                    handleSelectButton={props.handleSelectButton}
                    />
        })}
    </div>
  )
}
export default Desserts
```
And this is how I structured the `Dessert.jsx` component (with a possibility of changing it later):

`Dessert.jsx`:
```jsx
import AddToCart from './AddToCart'
const Dessert = (props) => {
    return (
    <div className='dessert red-hat-text'>
      <img className='dessert-image' src={props.image.mobile} alt={props.name} />
      <div className="dessert-button">
        <AddToCart />
        <button onClick={() => props.handleSelectButton({name: props.name, price: props.price})} className='add-to-cart-btn'>Add to Cart</button>
      </div>
      <div className="dessert-category">{props.category}</div>
      <div className="dessert-name">{props.name}</div>
      <div className="dessert-price">${props.price}</div>
    </div>
  )
}

export default Dessert 

```

- Since the user would click the "Add to Cart" button to add items to the cart, the first thing I thought of while handling this was conditional rendering, the empty cart would only be rendered if the user did not add any items to it, so I initialized an array state along with its state updater function `cartItems` and `setCartItems` respectively, then passed a function `handleClickButton` from the parent component `App.jsx` down to the component that held the "Add to Cart" button, which is `Dessert.jsx`. 
- So when the button is clicked, the name and price of the selected item will be passed to `handleClickButton` function, which will then push the object (`{name: props.name, price: props.price}`) to the `cartItems` array:
`Dessert.jsx`:
```jsx
<button onClick={() => props.handleSelectButton({name: props.name, price: props.price})} className='add-to-cart-btn'>Add to Cart</button>
```
`App.jsx`:
```jsx
const [cartItems, setCartItems] = useState([]);
const handleSelectButton = (item) => {
  setCartItems(prevCartItems => [...prevCartItems, item])
}
```

I created another component, named `FilledCart`, this would be the component that held items the user added to the cart.
- So I modified the `App.jsx` component to include it:
```jsx
import FilledCart from "./components/FilledCart" 
...
return (
  <div className='main-component'>
    <Desserts handleSelectButton={handleSelectButton}/>
      {cartItems.length === 0 ? <Cart /> : <FilledCart items={cartItems}/> }
  </div>
)
...
```
I also passed `cartItems` to `FilledCart` component, I then initialized a variable named `itemsCount` that would represent an array of objects, each object is an individual item with `name`, `price` and `count` as its properties, where `count` is how many times the item has been added to the cart.
```jsx
let itemsCount = [];
  props.items.forEach((item) => {
    let existingItem = itemsCount.find(element => element.name === item.name)
    if (existingItem) {
      existingItem.count++;
    } else {
      itemsCount.push({name: item.name, price: item.price, count: 1})
    }
  })
```
Then I rendered each item along with its `name`, `price` and `count` properties:
```jsx
<div className="items-added-list">
  {itemsCount.map((entry) => (
    <div key={entry.name} className="added-single-item">
      <div className="single-item-info">
        <h3 className='single-item-title'>{entry.name}</h3>
        <div className="pricing-single-item">
          <span className='single-item-count'>{`${entry.count}x`}</span>
          <span className='single-item-price'>{`@ $${entry.price}`}</span>
          <span className='single-item-total'>{`$${entry.price*entry.count}`}</span>
        </div>
      </div>
      <button className="remove-item-btn"><RemoveItem /></button>       
    </div>
  ))}
</div>
```
So `FilledCart.jsx` was as follows: 
```jsx
import RemoveItem from "./RemoveItem";
const FilledCart = (props) => {
  let itemsCount = [];
  props.items.forEach((item) => {
    let existingItem = itemsCount.find(element => element.name === item.name)
    if (existingItem) {
      existingItem.count++;
    } else {
      itemsCount.push({name: item.name, price: item.price, count: 1})
    }
  })
  return (
    <div className='filled-cart  red-hat-text'>
      <h1 className='filled-cart-title'>{`Your Cart (${props.items.length})`}</h1>
      <div className="items-added-list">
        {itemsCount.map((entry) => (
          <div key={entry.name} className="added-single-item">
            <div className="single-item-info">
              <h3 className='single-item-title'>{entry.name}</h3>
              <div className="pricing-single-item">
                <span className='single-item-count'>{`${entry.count}x`}</span>
                <span className='single-item-price'>{`@ $${entry.price}`}</span>
                <span className='single-item-total'>{`$${entry.price*entry.count}`}</span>
              </div>
            </div>
            <RemoveItem />           
          </div>
        ))}
      </div>
    </div>
  )
}
export default FilledCart
```
With `RemoveItem` being an svg component.

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library

### What I learned


### Continued development


### Useful resources

## Author

- GitHub - [@ziad-rima](https://github.com/ziad-rima)
- Frontend Mentor - [@ziad-rima](https://www.frontendmentor.io/profile/ziad-rima)
- X - [@rima4082](https://x.com/rima4082)

## Acknowledgments

