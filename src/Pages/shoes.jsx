import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Item/Item';
import FootwearBanner from '../Components/FootwearBanner';

const Shoes = () => {
  const { all_product } = useContext(ShopContext);

  const menShoes = all_product.filter(
    (item) => item.category === "shoes" && item.sub_category === "men"
  );

  const womenShoes = all_product.filter(
    (item) => item.category === "shoes" && item.sub_category === "women"
  );

  const kidsShoes = all_product.filter(
    (item) => item.category === "shoes" && item.sub_category === "kids"
  );

  return (
    <div style={{ backgroundColor: '#090D16', minHeight: '100vh', padding: '10px 0 60px 0', color: '#FFFFFF' }}>
      <FootwearBanner />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
        {/* Men's Footwear Section */}
        <section style={{ marginTop: '50px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #1E293B', paddingBottom: '12px', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: '900', letterSpacing: '0.5px', margin: 0, textTransform: 'uppercase', color: '#F8FAFC' }}>
              👟 MEN'S FOOTWEAR
            </h2>
            <span style={{ color: '#64748B', fontSize: '14px', fontWeight: '600' }}>{menShoes.length} Items</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '24px' }}>
            {menShoes.map((item, i) => (
              <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            ))}
          </div>
        </section>

        {/* Women's Footwear Section */}
        <section style={{ marginTop: '60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #1E293B', paddingBottom: '12px', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: '900', letterSpacing: '0.5px', margin: 0, textTransform: 'uppercase', color: '#F8FAFC' }}>
              👠 WOMEN'S FOOTWEAR
            </h2>
            <span style={{ color: '#64748B', fontSize: '14px', fontWeight: '600' }}>{womenShoes.length} Items</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '24px' }}>
            {womenShoes.map((item, i) => (
              <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            ))}
          </div>
        </section>

        {/* Kids' Footwear Section */}
        <section style={{ marginTop: '60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #1E293B', paddingBottom: '12px', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: '900', letterSpacing: '0.5px', margin: 0, textTransform: 'uppercase', color: '#F8FAFC' }}>
              👟 KIDS' FOOTWEAR
            </h2>
            <span style={{ color: '#64748B', fontSize: '14px', fontWeight: '600' }}>{kidsShoes.length} Items</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '24px' }}>
            {kidsShoes.map((item, i) => (
              <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Shoes;