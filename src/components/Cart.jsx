function Cart({
  cart,
  onClose,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  handleCheckout
}) {
  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  )

  return (
    <div className="cart-overlay">

      <div className="cart">

        <div className="cart-header">

          <div>
            <p className="cart-small-title">
              iFlowers
            </p>

            <h2>Your Cart</h2>
          </div>

          <button
            className="cart-close"
            onClick={onClose}
          >
            ×
          </button>

        </div>

        {cart.length === 0 ? (

          <div className="empty-cart">

            <h3>
              Your cart is empty.
            </h3>

            <p>
              Add a bouquet from our collection.
            </p>

            <button onClick={onClose}>
              Continue Shopping
            </button>

          </div>

        ) : (

          <>
            <div className="cart-items">

              {cart.map((item) => (

                <div
                  className="cart-item"
                  key={item.id}
                >

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div className="cart-item-info">

                    <h3>{item.name}</h3>

                    <p className="cart-item-price">
                      {item.price} ₸
                    </p>

                    <div className="cart-item-actions">

                      <div className="quantity-controls">

                        <button
                          onClick={() =>
                            decreaseQuantity(
                              item.id
                            )
                          }
                        >
                          −
                        </button>

                        <span>
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            increaseQuantity(
                              item.id
                            )
                          }
                        >
                          +
                        </button>

                      </div>

                      <button
                        className="remove-button"
                        onClick={() =>
                          removeFromCart(
                            item.id
                          )
                        }
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                  <div className="cart-item-subtotal">
                    {item.price *
                      item.quantity} ₸
                  </div>

                </div>

              ))}

            </div>

            <div className="cart-summary">

              <div className="cart-total">
                <span>Total</span>

                <strong>
                  {total} ₸
                </strong>
              </div>

              <p className="cart-note">
                Final price includes the selected bouquets.
              </p>

              <button
                className="checkout-button"
                onClick={handleCheckout}
              >
                Checkout
              </button>

              <button
                className="continue-button"
                onClick={onClose}
              >
                Continue Shopping
              </button>

            </div>
          </>
        )}

      </div>

    </div>
  )
}

export default Cart