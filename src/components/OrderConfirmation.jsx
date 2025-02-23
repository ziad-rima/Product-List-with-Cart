import { useEffect } from "react"
import IconConfirmed from "./IconConfirmed"

const OrderConfirmation = (props) => {
    const totalPrice = props.items.reduce(
        (acc, currentValue) => acc + (currentValue.price * currentValue.count), 0)
      
    const handleNewOrder = () => {
      props.setIsConfirmed(false)
      props.setCartItems([])
    }

    useEffect(() => {
      if (props.isConfirmed) {
          document.body.classList.add("no-scroll");
      } else {
          document.body.classList.remove("no-scroll");
      }
      return () => document.body.classList.remove("no-scroll");
    }, [props.isConfirmed]);

  return (
    <div className={`order-confirmation-component red-hat-text ${props.isConfirmed ? "show" : ""}`}>
      <div className="order-confirmation-header">
        <IconConfirmed />
        <h1 className="order-confirmation-title">Order Confirmed</h1>
        <p className="order-confirmation-text">We hope you enjoy your food!</p>
      </div>

      <div className="ordered-items red-hat-text">
        {props.items.map((item) => (
            <div key={item.name} className="single-item">
                <div className="item-info">
                  <img className="thumbnail-image" src={item.image.thumbnail} alt="thumbnail" />
                  <div className="pricing-item">
                    <h3 className='item-title'>{item.name}</h3>
                    <div className="price-count">
                      <span className='item-count'>{`${item.count}x`}</span>
                      <span className='item-price'><span className="at-sym">@</span>{`$${item.price}`}</span>
                    </div>
                  </div>
                  <div className='item-total'>{`$${item.price*item.count}`}</div>
                </div> 
            </div>
        ))}
        <div className="order-total-container">
            <p className="order-total-text">Order Total</p>
            <p className="order-total-amount">${totalPrice}</p>
        </div> 
      </div>
      <button onClick={() => handleNewOrder()} className="start-new-order-btn red-hat-text">Start New Order</button>
    </div>
  )
}

export default OrderConfirmation
