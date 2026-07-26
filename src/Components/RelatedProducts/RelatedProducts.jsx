import React, { useContext } from 'react';
import './RelatedProducts.css';
import { ShopContext } from '../../Context/ShopContext';
import Item from '../Item/Item';

const RelatedProducts = (props) => {
  const { all_product } = useContext(ShopContext);

  // Yeh current product ki category ke mutabiq 4 related products filter karega (aur usi product ko chor dega)
  const filteredProducts = all_product
    .filter((item) => item.category === props.category && item.id !== props.id)
    .slice(0, 4);

  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {filteredProducts.map((item) => {
          return (
            <Item 
              key={item.id} 
              id={item.id} 
              name={item.name} 
              image={item.image} 
              new_price={item.new_price} 
              old_price={item.old_price} 
            />
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;