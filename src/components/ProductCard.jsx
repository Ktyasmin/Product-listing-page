import { CartIcon, HeartIcon } from "./Icons";


function formatPrice(value) {
  return "₹" + value.toLocaleString("en-IN");
}


function Stars({ rating }) {
  const width = (rating / 5) * 100;
  return (
    <span className="stars" aria-label={`${rating} out of 5`}>
      <span className="stars-empty">★★★★★</span>
      <span className="stars-filled" style={{ width: `${width}%` }}>
        ★★★★★
      </span>
    </span>
  );
}

function ProductCard({ product, isFavorite, onToggleFavorite, onAddToCart }) {
  const isDiscount = product.badge.startsWith("-");

  return (
    <article className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />

        <span className={isDiscount ? "badge badge-discount" : "badge badge-new"}>
          {product.badge}
        </span>

        <button
          className={isFavorite ? "heart-btn active" : "heart-btn"}
          onClick={() => onToggleFavorite(product.id)}
          aria-label="Add to favorites"
        >
          <HeartIcon size={16} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>

        <div className="product-rating">
          <Stars rating={product.rating} />
          <span className="reviews">({product.reviews})</span>
        </div>

        <div className="product-prices">
          <span className="price">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="old-price">{formatPrice(product.oldPrice)}</span>
          )}
        </div>

        <button className="add-btn" onClick={onAddToCart}>
          <CartIcon size={15} />
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export { Stars };
export default ProductCard;