import React, { useContext, useState } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext)
    
    const [promoInput, setPromoInput] = useState('')
    const [discount, setDiscount] = useState(0)
    const [promoApplied, setPromoApplied] = useState(false)
    const [promoError, setPromoError] = useState('')

    const [showPayment, setShowPayment] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState('JazzCash')

    const whatsappNumber = "923001234567"

    const subtotal = getTotalCartAmount()

    const handleApplyPromo = () => {
        if (promoInput.trim().toUpperCase() === 'FARAZ') {
            setDiscount(75)
            setPromoApplied(true)
            setPromoError('')
        } else {
            setPromoError('Invalid Promo Code')
            setDiscount(0)
            setPromoApplied(false)
        }
    }

    const discountAmount = (subtotal * discount) / 100
    const finalTotal = subtotal - discountAmount

    const handleConfirmOrder = () => {
        if (finalTotal === 0) return

        let orderDetails = "Hello! I want to place an order:%0A%0A"
        
        all_product.forEach((item) => {
            if (cartItems[item.id] > 0) {
                orderDetails += `- ${item.name} (Qty: ${cartItems[item.id]}) - $${item.new_price * cartItems[item.id]}%0A`
            }
        })

        orderDetails += `%0ASubtotal: $${subtotal.toFixed(2)}`
        if (promoApplied) {
            orderDetails += `%0ADiscount (75% FARAZ): -$${discountAmount.toFixed(2)}`
        }
        orderDetails += `%0ATotal Amount: $${finalTotal.toFixed(2)}`
        orderDetails += `%0APayment Method: ${paymentMethod}`

        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${orderDetails}`
        window.open(whatsappUrl, '_blank')
    }

    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className="cartitems-format cartitems-format-main">
                                <img src={e.image} alt="" className='carticon-product-icon' />
                                <p className='cartitems-product-title'>{e.name}</p>
                                <p>${e.new_price}</p>
                                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                                <p>${e.new_price * cartItems[e.id]}</p>
                                <img className='cartitems-remove-icon' src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="" />
                            </div>
                            <hr />
                        </div>
                    )
                }
                return null
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>${subtotal.toFixed(2)}</p>
                        </div>
                        <hr />
                        {promoApplied && (
                            <>
                                <div className="cartitems-total-item discount-row">
                                    <p>Discount (75% - FARAZ)</p>
                                    <p>-${discountAmount.toFixed(2)}</p>
                                </div>
                                <hr />
                            </>
                        )}
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>${finalTotal.toFixed(2)}</h3>
                        </div>
                    </div>

                    {!showPayment ? (
                        <button onClick={() => setShowPayment(true)}>PROCEED TO CHECKOUT</button>
                    ) : (
                        <div className="cartitems-payment-section">
                            <h3>Select Payment Method:</h3>
                            <div className="payment-options">
                                <label className={paymentMethod === 'JazzCash' ? 'selected' : ''}>
                                    <input 
                                        type="radio" 
                                        name="payment" 
                                        value="JazzCash" 
                                        checked={paymentMethod === 'JazzCash'} 
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    JazzCash
                                </label>
                                <label className={paymentMethod === 'Easypaisa' ? 'selected' : ''}>
                                    <input 
                                        type="radio" 
                                        name="payment" 
                                        value="Easypaisa" 
                                        checked={paymentMethod === 'Easypaisa'} 
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    Easypaisa
                                </label>
                                <label className={paymentMethod === 'Credit/Debit Card' ? 'selected' : ''}>
                                    <input 
                                        type="radio" 
                                        name="payment" 
                                        value="Credit/Debit Card" 
                                        checked={paymentMethod === 'Credit/Debit Card'} 
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    Credit / Debit Card
                                </label>
                                <label className={paymentMethod === 'Cash on Delivery' ? 'selected' : ''}>
                                    <input 
                                        type="radio" 
                                        name="payment" 
                                        value="Cash on Delivery" 
                                        checked={paymentMethod === 'Cash on Delivery'} 
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    Cash on Delivery (COD)
                                </label>
                            </div>
                            <button className="confirm-btn" onClick={handleConfirmOrder}>CONFIRM & PLACE ORDER</button>
                        </div>
                    )}
                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promo code, enter it here</p>
                    <div className="cartitems-promobox">
                        <input 
                            type="text" 
                            placeholder='promo code' 
                            value={promoInput} 
                            onChange={(e) => setPromoInput(e.target.value)}
                        />
                        <button onClick={handleApplyPromo}>Submit</button>
                    </div>
                    {promoApplied && <p className="promo-success-msg">Code FARAZ Applied! 75% Off</p>}
                    {promoError && <p className="promo-error-msg">{promoError}</p>}
                </div>
            </div>
        </div>
    )
}

export default CartItems