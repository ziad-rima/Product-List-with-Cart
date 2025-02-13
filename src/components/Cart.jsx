import EmptyCart from './EmptyCart'
const Cart = () => {
  return (
    <div className='cart-component red-hat-text'>
      <h1 className='cart-title'>Your Cart (0)</h1>
      <EmptyCart />
      <p className='cart-paragraph'>Your added items will appear here</p>
    </div>
  )
}

export default Cart
