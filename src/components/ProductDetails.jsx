function ProductDetails({ product, onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">

        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <img src={product.image} alt={product.name} />

        <div className="modal-info">
          <h2>{product.name}</h2>

          <p className="modal-price">
            {product.price.toLocaleString('en-US')} ₸
            {product.onSale && !product.isExpired && (
              <span className="details-discount"> (-{product.discount}%)</span>
            )}
          </p>

          <div className="modal-detail">
            <strong>Category</strong>
            <p>{product.category}</p>
          </div>

          <div className="modal-detail">
            <strong>Description</strong>
            <p>{product.fullDescription}</p>
          </div>

          <div className="modal-detail">
            <strong>Additional info</strong>
            <p>{product.additionalInfo}</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ProductDetails