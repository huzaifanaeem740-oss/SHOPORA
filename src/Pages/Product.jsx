import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';

import Breadcrum from '../Components/Breadcrum/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Product = () => {

  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();

  const product = all_product.find(
    (item) => item.id === Number(productId)
  );


  if (!product) {
    return (
      <div style={{
        textAlign: "center",
        padding: "100px",
        fontSize: "25px"
      }}>
        Product Not Found
      </div>
    );
  }


  return (
    <div>

      <Breadcrum product={product} />

      <ProductDisplay product={product} />

      <DescriptionBox />

      <RelatedProducts />

    </div>
  );
};


export default Product;