import AddToCart from './AddToCart'
const Dessert = (props) => {
    const foundItem = props.items.find((item) => item.name === props.name)
    return (
    <div className='dessert red-hat-text'>
      <img className='dessert-image' src={props.image.mobile} alt={props.name} />
      <div className="dessert-button">
        <AddToCart />
        { foundItem && foundItem.count > 0 ? (
          <button className='counter-btn'>
          - {foundItem.count} +
          </button>
        ) : (
          <button 
          onClick={() => props.handleSelectButton({name: props.name, price: props.price})} 
          className='add-to-cart-btn'>Add to Cart
          </button>
        )
        }
      </div>
      <div className="dessert-category">{props.category}</div>
      <div className="dessert-name">{props.name}</div>
      <div className="dessert-price">${props.price}</div>
    </div>
  )
}

export default Dessert 
