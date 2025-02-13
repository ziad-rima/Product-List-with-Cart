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
