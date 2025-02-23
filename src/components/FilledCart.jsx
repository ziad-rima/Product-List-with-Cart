import RemoveItem from "./RemoveItem";
import CarbonNeutral from "./CarbonNeutral";
const FilledCart = (props) => {
    const totalPrice = props.items.reduce(
        (acc, currentValue) => acc + (currentValue.price * currentValue.count), 0)
    let totalCount = props.items.reduce(
        (acc, currentValue) => acc + currentValue.count, 0)
    return (
      <div className='filled-cart red-hat-text'>
        <h1 className='filled-cart-title'>{`Your Cart (${totalCount})`}</h1>
        <div className="items-added-list">
            {props.items.map((entry) => (
                <div key={entry.name} className="added-single-item">
                    <div className="single-item-info">
                        <h3 className='single-item-title'>{entry.name}</h3>
                        <div className="pricing-single-item">
                            <span className='single-item-count'>{`${entry.count}x`}</span>
                            <span className='single-item-price'><span className="at-sym">@</span>{`$${entry.price}`}</span>
                            <span className='single-item-total'>{`$${entry.price*entry.count}`}</span>
                        </div>
                    </div>
                    <div onClick={() => props.deleteItem(entry)} className="remove-item-container"><button className="remove-item-btn"><RemoveItem /></button></div>         
                </div>
            ))}
        </div>
        <div className="order-total-container">
            <p className="order-total-text">Order Total</p>
            <p className="order-total-amount">${totalPrice}</p>
        </div>
        <div className="carbon-neutral-container">
            <span className="carbon-neutral-icon"><CarbonNeutral /></span>
            <p className="carbon-neutral-text">This is a <span className="to-bold">carbon-neutral</span> delivery</p>
        </div>
        <button onClick={() => props.handleConfirmation()} className="confirm-order-btn red-hat-text">Confirm Order</button>
      </div>
    )
}
export default FilledCart
