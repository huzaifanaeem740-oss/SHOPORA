<div className="add-product-itemfield">
  <p>Product Category</p>
  <select 
    value={form.category} 
    onChange={(e) => setForm({...form, category: e.target.value})}
    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #c7c7c7', width: '100%' }}
  >
    <option value="men">Men</option>
    <option value="women">Women</option>
    <option value="t-shirt">T-Shirt</option>
    <option value="crop top">Crop Top</option>
    <option value="footwear">Footwear / Shoes</option>
    <option value="slippers">Slippers</option>
    <option value="watch">Watch</option>
    <option value="perfume">Perfume</option>
    <option value="belts">Belts</option>
    <option value="cap">Cap</option>
  </select>
</div>