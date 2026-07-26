import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../Components/Breadcrum/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (all_product && all_product.length > 0) {
      const foundProduct = all_product.find((e) => e.id == productId);
      setProduct(foundProduct);
    }
  }, [productId, all_product]);

  if (!product) {
    return <div style={{ textAlign: 'center', padding: '50px', fontSize: '18px' }}>Loading product...</div>;
  }

  return (
    <div>
      <Breadcrumb product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts category={product.category} id={product.id} />
    </div>
  );
};

export default Product;