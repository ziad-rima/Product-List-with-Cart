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
                    <button className="remove-item-btn"><RemoveItem /></button>           
                </div>
            ))}
        </div>
      </div>
    )
}
export default FilledCart
