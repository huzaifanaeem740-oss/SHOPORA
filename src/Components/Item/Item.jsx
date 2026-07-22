import React from 'react'
import { Link } from 'react-router-dom'
import './Item.css'

const Item = (props) => {
  return (
    <div className='item'>
      <Link to={`/product/${props.id}`} onClick={() => window.scrollTo(0, 0)}>
        <img src={props.image} alt={props.name} />
      </Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">
          PKR-{props.new_price}
        </div>
        {props.old_price > 0 && (
          <div className="item-price-old">
            PKR-{props.old_price}
          </div>
        )}
      </div>
    </div>
  )
}

export default Item