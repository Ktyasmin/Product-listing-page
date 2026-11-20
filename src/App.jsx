import { useState } from "react";
import { products } from "./data/products";
import ProductCard from "./components/ProductCard";
import Sidebar, { MAX_PRICE } from "./components/Sidebar";
import {
  TruckIcon,
  SearchIcon,
  UserIcon,
  CartIcon,
  GridIcon,
  ListIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "./components/Icons";
import "./App.css";

function App() {
  // ---- State (useState) ----
  const [search, setSearch] = useState("");          // required: search input
  const [cartCount, setCartCount] = useState(0);     // required: cart counter

  const [category, setCategory] = useState("All Products");
  const [sortBy, setSortBy] = useState("best");
  const [view, setView] = useState("grid");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);

  // ---- Event handlers ----
  function handleAddToCart() {
    setCartCount(cartCount + 1);
  }

  function handleToggleFavorite(id) {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  }

  function handleBrandToggle(brand) {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  }

  function handleRatingChange(stars) {
    // clicking the same option again clears the filter
    setMinRating(minRating === stars ? 0 : stars);
  }

  // ---- Filtering + sorting (derived from state) ----
  let visibleProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All Products" || product.category === category;
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const matchesRating = product.rating >= minRating;

    return matchesSearch && matchesCategory && matchesPrice && matchesBrand && matchesRating;
  });

  if (sortBy === "price-asc") {
    visibleProducts = [...visibleProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    visibleProducts = [...visibleProducts].sort((a, b) => b.price - a.price);
  }

  const total = visibleProducts.length;

  return (
    <div className="page">
      {/* Top announcement bar */}
      <div className="announcement">
        <TruckIcon size={16} />
        <span>
          Free shipping on orders above <strong>₹999</strong>
        </span>
      </div>

      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <a href="#" className="logo">
            <img src="/logo.svg" alt="ShopEase logo" />
            <span>ShopEase</span>
          </a>

          <nav className="nav">
            <a href="#">Home</a>
            <a href="#" className="active">Shop</a>
            <a href="#">Deals</a>
            <a href="#">New Arrivals</a>
            <a href="#">Contact</a>
          </nav>

          <div className="header-actions">
            <div className="search-box">
              <SearchIcon size={16} />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <button className="icon-btn" aria-label="Account">
              <UserIcon size={22} />
            </button>

            <button className="icon-btn cart-btn" aria-label="Cart">
              <CartIcon size={22} />
              <span className="cart-badge">{cartCount}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container">
        <div className="page-head">
          <div>
            <h1 className="page-title">Shop</h1>
            <p className="page-subtitle">Discover our products</p>
          </div>

          <div className="toolbar">
            <label htmlFor="sort">Sort by</label>
            <div className="select-wrap">
              <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="best">Best sellers</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </select>
              <ChevronDownIcon size={14} />
            </div>

            <div className="view-toggle">
              <button
                className={view === "grid" ? "active" : ""}
                onClick={() => setView("grid")}
                aria-label="Grid view"
              >
                <GridIcon size={16} />
              </button>
              <button
                className={view === "list" ? "active" : ""}
                onClick={() => setView("list")}
                aria-label="List view"
              >
                <ListIcon size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="layout">
          <Sidebar
            category={category}
            onCategoryChange={setCategory}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onMinPriceChange={setMinPrice}
            onMaxPriceChange={setMaxPrice}
            selectedBrands={selectedBrands}
            onBrandToggle={handleBrandToggle}
            minRating={minRating}
            onRatingChange={handleRatingChange}
          />

          <section className="products">
            {total === 0 ? (
              <p className="no-results">No products found.</p>
            ) : (
              <div className={view === "list" ? "product-grid list" : "product-grid"}>
                {visibleProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isFavorite={favorites.includes(product.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}

            {/* Page numbers only show when there are products */}
            {total > 0 && (
              <div className="pagination-row">
                <span className="showing">
                  Showing {total === 0 ? 0 : 1}–{total} of {total} products
                </span>

                <div className="pagination">
                  {[1, 2, 3].map((n) => (
                    <button
                      key={n}
                      className={page === n ? "page-btn active" : "page-btn"}
                      onClick={() => setPage(n)}
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    className="page-btn"
                    onClick={() => setPage(page === 3 ? 1 : page + 1)}
                    aria-label="Next page"
                  >
                    <ChevronRightIcon size={14} />
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;