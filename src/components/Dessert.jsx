import AddToCart from './AddToCart'
import IncrementSVG from './IncrementSVG'
import DecrementSVG from './DecrementSVG'
const Dessert = (props) => {
    const foundItem = props.items.find((item) => item.name === props.name)
    return (
    <div className='dessert red-hat-text'>
      <picture>
        <source media="min-width: 1024px" srcSet={props.image.desktop} />
        <source media="min-width: 768px" srcSet={props.image.tablet}/>
        <img className='dessert-image' src={props.image.mobile} alt={props.name} />
      </picture>
      <div className="dessert-button">
        { foundItem && foundItem.count > 0 ? (
          <div className='counter-btn-container'>
            <button className='decrement-button counter-button red-hat-text' onClick={() => props.decrementCount(foundItem)}><DecrementSVG /></button> <span className='found-item-count'>{foundItem.count} </span><button className='increment-button counter-button red-hat-text' onClick={() => props.incrementCount(foundItem)}><IncrementSVG /></button>
          </div>
        ) : (
          <div className="add-to-cart-container" onClick={() => props.handleSelectButton({name: props.name, price: props.price, image: props.image})}>
            <AddToCart />
            <button 
            className='add-to-cart-btn red-hat-text'>Add to Cart
            </button>
          </div> 
        )
        }
      </div>
      <div className="desserts-info">
        <div className="dessert-category">{props.category}</div>
        <div className="dessert-name">{props.name}</div>
        <div className="dessert-price">${props.price}</div>
      </div>
    </div>
  )
}

export default Dessert 
