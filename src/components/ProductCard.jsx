function ProductCard({ product, onViewDetails, addToCart, buyNow }) {
  const secondsLeft = Math.ceil(product.remaining / 1000)
  const days = Math.floor(secondsLeft / 86400)
  const hours = Math.floor((secondsLeft % 86400) / 3600)
  const minutes = Math.floor((secondsLeft % 3600) / 60)
  const seconds = secondsLeft % 60
  const twoDigits = (number) => String(number).padStart(2, '0')

  return (
    <div className="flower-card sale-card">
      <div className="sale-image-wrap">
        <img src={product.image} alt={product.name} />
        {product.onSale && !product.isExpired && (
          <span className="sale-badge">-{product.discount}%</span>
        )}
      </div>

      <h3>{product.name}</h3>
      <p className="description">{product.description}</p>
      <p className="category">Category: {product.category}</p>

      {!product.onSale ? (
        <p className="price">{product.price.toLocaleString('en-US')} ₸</p>
      ) : product.isExpired ? (
        <>
          <p className="price">{product.originalPrice.toLocaleString('en-US')} ₸</p>
          <div className="sale-expired">Sale Expired</div>
        </>
      ) : (
        <>
          <div className="sale-prices">
            <span className="old-price">{product.originalPrice.toLocaleString('en-US')} ₸</span>
            <strong className="new-price">{product.price.toLocaleString('en-US')} ₸</strong>
          </div>
          <div className="sale-timer" aria-label="Time remaining until sale ends">
            <span className="timer-label">SALE ENDS IN</span>
            <div className="timer-values">
              <span><strong>{twoDigits(days)}</strong><small>Days</small></span>
              <span><strong>{twoDigits(hours)}</strong><small>Hours</small></span>
              <span><strong>{twoDigits(minutes)}</strong><small>Min</small></span>
              <span><strong>{twoDigits(seconds)}</strong><small>Sec</small></span>
            </div>
          </div>
        </>
      )}

      <div className="product-buttons">
        <button className="details-button" onClick={() => onViewDetails(product)}>
          View Details
        </button>
        <button className="cart-button" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
        <button className="buy-button" onClick={() => buyNow(product)}>
          Buy Now
        </button>
      </div>
    </div>
  )
}

export default ProductCard
