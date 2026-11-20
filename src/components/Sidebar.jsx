import { categories, brands } from "../data/products";
import { Stars } from "./ProductCard";
import {
  AllIcon,
  ElectronicsIcon,
  AccessoriesIcon,
  ShirtIcon,
  HomeIcon,
  SportsIcon,
} from "./Icons";

const MAX_PRICE = 10000;
const STEP = 100;

const categoryIcons = {
  "All Products": <AllIcon size={16} />,
  "Electronics": <ElectronicsIcon size={16} />,
  "Accessories": <AccessoriesIcon size={16} />,
  "Clothing": <ShirtIcon size={16} />,
  "Home": <HomeIcon size={16} />,
  "Sports": <SportsIcon size={16} />,
};

function Sidebar({
  category,
  onCategoryChange,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  selectedBrands,
  onBrandToggle,
  minRating,
  onRatingChange,
}) {
  // position of the blue part of the slider (in %)
  const left = (minPrice / MAX_PRICE) * 100;
  const right = 100 - (maxPrice / MAX_PRICE) * 100;

  return (
    <aside className="sidebar">
      {/* Categories */}
      <section className="filter-block">
        <h2 className="filter-title">Categories</h2>
        <ul className="category-list">
          {categories.map((name) => (
            <li key={name}>
              <button
                className={category === name ? "category-btn active" : "category-btn"}
                onClick={() => onCategoryChange(name)}
              >
                {categoryIcons[name]}
                {name}
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Price */}
      <section className="filter-block">
        <h2 className="filter-title">Filter by price</h2>
        <div className="range">
          <div className="range-track" />
          <div className="range-fill" style={{ left: `${left}%`, right: `${right}%` }} />
          <input
            type="range"
            min="0"
            max={MAX_PRICE}
            step={STEP}
            value={minPrice}
            onChange={(e) => onMinPriceChange(Math.min(Number(e.target.value), maxPrice - STEP))}
          />
          <input
            type="range"
            min="0"
            max={MAX_PRICE}
            step={STEP}
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(Math.max(Number(e.target.value), minPrice + STEP))}
          />
        </div>
        <div className="range-labels">
          <span>₹{minPrice.toLocaleString("en-IN")}</span>
          <span>₹{maxPrice.toLocaleString("en-IN")}</span>
        </div>
      </section>

      {/* Brand */}
      <section className="filter-block">
        <h2 className="filter-title">Brand</h2>
        <ul className="brand-list">
          {brands.map((brand) => (
            <li key={brand}>
              <label className="brand-item">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => onBrandToggle(brand)}
                />
                {brand}
              </label>
            </li>
          ))}
        </ul>
      </section>

      {/* Rating */}
      <section className="filter-block">
        <h2 className="filter-title">Rating</h2>
        <ul className="rating-list">
          {[5, 4, 3, 2, 1].map((stars) => (
            <li key={stars}>
              <button
                className={minRating === stars ? "rating-btn active" : "rating-btn"}
                onClick={() => onRatingChange(stars)}
              >
                <Stars rating={stars} />
                <span>& up</span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}

export { MAX_PRICE };
export default Sidebar;