import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();

  // Number conversion check taake string/number mismatch na ho
  const product = all_product.find((e) => e.id === Number(productId));

  // Agar product na mile toh blank page ki bajaye error ya loading message dikhayein
  if (!product) {
    return <div style={{ padding: '50px', textAlign: 'center' }}>Product not found or loading...</div>;
  }

  return (
    <div>
      <ProductDisplay product={product} />
    </div>
  );
};

export default Product;