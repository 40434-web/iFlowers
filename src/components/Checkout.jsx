import { useState } from 'react'

const initialForm = {
  fullName: '', email: '', phone: '', address: '', city: '',
  paymentMethod: 'cash', cardHolder: '', cardNumber: '',
  expiryDate: '', cvv: '', comment: ''
}

function Checkout({ cart, clearCart, onClose }) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [order, setOrder] = useState(null)
  const [success, setSuccess] = useState(false)
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  function handleChange(event) {
    const { name, value } = event.target
    let nextValue = value
    if (name === 'cardNumber') nextValue = value.replace(/\D/g, '').slice(0, 16)
    if (name === 'cvv') nextValue = value.replace(/\D/g, '').slice(0, 4)
    if (name === 'expiryDate') {
      const digits = value.replace(/\D/g, '').slice(0, 4)
      nextValue = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits
    }
    setForm(previous => ({ ...previous, [name]: nextValue }))
    setErrors(previous => ({ ...previous, [name]: '' }))
  }

  function validate() {
    const next = {}
    for (const field of ['fullName', 'email', 'phone', 'address', 'city']) {
      if (!form[field].trim()) next[field] = 'This field is required.'
    }
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Enter a valid email.'
    }
    if (form.phone.trim() && !/^\+?[\d\s()\-]{10,20}$/.test(form.phone)) {
      next.phone = 'Enter a valid phone number.'
    }
    if (form.phone.trim() && form.phone.replace(/\D/g, '').length < 10) {
      next.phone = 'Enter at least 10 digits.'
    }
    if (form.paymentMethod === 'card') {
      if (!form.cardHolder.trim()) next.cardHolder = 'Cardholder name is required.'
      if (!/^\d{16}$/.test(form.cardNumber)) next.cardNumber = 'Enter exactly 16 digits.'
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiryDate)) next.expiryDate = 'Use MM/YY.'
      if (!/^\d{3,4}$/.test(form.cvv)) next.cvv = 'Enter 3 or 4 digits.'
    }
    if (cart.length === 0) next.cart = 'Your cart is empty.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function submit(event) {
    event.preventDefault()
    setSuccess(false)
    if (!validate()) return
    // Do not save card number, expiry date or CVV in the order summary.
    setOrder({
      fullName: form.fullName, email: form.email, phone: form.phone,
      address: form.address, city: form.city, paymentMethod: form.paymentMethod,
      products: cart.map(({ id, name, price, quantity }) => ({ id, name, price, quantity })),
      total
    })
    setForm(initialForm)
    setErrors({})
    clearCart()
    setSuccess(true)
  }

  function reset() {
    setForm(initialForm)
    setErrors({})
  }

  const fields = [
    ['fullName', 'Full Name'], ['email', 'Email'], ['phone', 'Phone'],
    ['address', 'Delivery Address'], ['city', 'City']
  ]
  const cardFields = [
    ['cardHolder', 'Cardholder Name'], ['cardNumber', 'Card Number'],
    ['expiryDate', 'Expiry Date (MM/YY)'], ['cvv', 'CVV']
  ]

  function renderField([name, label]) {
    return (
      <div className="checkout-field" key={name}>
        <label htmlFor={`checkout-${name}`}>{label} *</label>
        <input
          id={`checkout-${name}`}
          name={name}
          type={name === 'email' ? 'email' : name === 'cvv' ? 'password' : name === 'phone' ? 'tel' : 'text'}
          value={form[name]}
          onChange={handleChange}
          autoComplete={name === 'cardNumber' || name === 'cvv' ? 'off' : 'on'}
          maxLength={name === 'cardNumber' ? 16 : name === 'cvv' ? 4 : undefined}
        />
        {errors[name] && <p className="checkout-error">{errors[name]}</p>}
      </div>
    )
  }

  return (
    <div className="checkout-overlay">
      <section className="checkout-panel">
        <div className="checkout-heading">
          <div><p className="checkout-eyebrow">iFlowers</p><h2>Order Checkout</h2></div>
          <button type="button" className="checkout-x" onClick={onClose} aria-label="Close checkout">×</button>
        </div>
        {success && <p className="checkout-success">Order successfully placed!</p>}
        {order && (
          <section className="checkout-order">
            <h2>Your Order</h2>
            <p><strong>Customer:</strong> {order.fullName}</p>
            <p><strong>Email:</strong> {order.email}</p>
            <p><strong>Phone:</strong> {order.phone}</p>
            <p><strong>Delivery Address:</strong> {order.address}, {order.city}</p>
            <p><strong>Payment:</strong> {order.paymentMethod === 'card' ? 'Bank card' : 'Cash on delivery'}</p>
            <h3>Products</h3>
            {order.products.map(item => (
              <p key={item.id}>{item.name} × {item.quantity} — {(item.price * item.quantity).toLocaleString()} ₸</p>
            ))}
            <p><strong>Total: {order.total.toLocaleString()} ₸</strong></p>
          </section>
        )}
        <form onSubmit={submit} noValidate>
          <div className="checkout-fields">{fields.map(renderField)}</div>
          <fieldset className="checkout-payment">
            <legend>Payment Method</legend>
            <label><input type="radio" name="paymentMethod" value="card" checked={form.paymentMethod === 'card'} onChange={handleChange} /> Bank card</label>
            <label><input type="radio" name="paymentMethod" value="cash" checked={form.paymentMethod === 'cash'} onChange={handleChange} /> Cash on delivery</label>
          </fieldset>
          {form.paymentMethod === 'card' && (
            <div className="checkout-card-fields">
              <h3>Card Information (demo only)</h3>
              <p>Use test numbers only. No real payments are processed.</p>
              <div className="checkout-fields">{cardFields.map(renderField)}</div>
            </div>
          )}
          <div className="checkout-field">
            <label htmlFor="checkout-comment">Order Comment</label>
            <textarea id="checkout-comment" name="comment" rows="3" value={form.comment} onChange={handleChange} />
          </div>
          {errors.cart && <p className="checkout-error">{errors.cart}</p>}
          <p className="checkout-total">Cart total: {total.toLocaleString()} ₸</p>
          <div className="checkout-actions">
            <button type="submit" className="checkout-primary">Place Order</button>
            <button type="button" onClick={reset}>Reset Form</button>
            <button type="button" onClick={clearCart}>Clear Cart</button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default Checkout
