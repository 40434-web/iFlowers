import { useEffect, useState } from 'react'

import rose from '../assets/rose.jpeg'
import tulip from '../assets/tulip.jpeg'
import peony from '../assets/peony.jpeg'
import sprayRose from '../assets/sprayRose.jpeg'
import hydrangea from '../assets/hydrangea.jpeg'
import gerbera from '../assets/gerbera.jpeg'
import orchid from '../assets/orchid.jpeg'
import sunflower from '../assets/sunflower.jpeg'
import carnation from '../assets/carnation.jpeg'
import chrysanthemum from '../assets/chrysanthemum.jpeg'

import ProductCard from './ProductCard'
import ProductDetails from './ProductDetails'

function Flowers({ addToCart, buyNow }) {
  const [selectedProduct, setSelectedProduct] = useState(null)

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('default')

  // Each sale deadline is saved so refreshing the page does not restart the timer.
  const [saleDeadlines] = useState(() => {
    const storageKey = 'iflowers-sale-deadlines-v3'
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || 'null')
      if (saved && typeof saved === 'object') return saved
    } catch {
      // Start new sale deadlines if saved data is invalid.
    }
    const now = Date.now()
    const durations = [90, 7200, 86400, 172800, 3600, 10800]
    const ids = [10, 8, 3, 5, 2, 9]
    const result = Object.fromEntries(ids.map((id, i) => [id, now + durations[i] * 1000]))
    localStorage.setItem(storageKey, JSON.stringify(result))
    return result
  })

  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const intervalId = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(intervalId)
  }, [])

  const flowers = [
    {
      id: 10,
      name: "Chrysanthemum Basket",
      description: "Soft pink chrysanthemums arranged in a beautiful basket",
      price: 15900,
      category: "Flower Arrangements",
      image: chrysanthemum,
      fullDescription:
        "A soft and elegant arrangement of pink chrysanthemums presented in a decorative basket.",
      additionalInfo:
        "Perfect for birthdays, celebrations and thoughtful gifts."
    },
    {
      id: 8,
      name: "Sunflower Bouquet",
      description: "Bright sunflower bouquet with warm seasonal details",
      price: 12900,
      category: "Seasonal Bouquets",
      image: sunflower,
      fullDescription:
        "A cheerful bouquet of bright sunflowers with greenery and decorative wrapping.",
      additionalInfo:
        "Perfect for birthdays, congratulations and cheerful occasions."
    },
    {
      id: 3,
      name: "Peony Bouquet",
      description: "Romantic bouquet of soft pink and white peonies",
      price: 24900,
      category: "Premium Bouquets",
      image: peony,
      fullDescription:
        "A large romantic bouquet made with delicate pink and white peonies.",
      additionalInfo:
        "A premium seasonal bouquet for special occasions."
    },
    {
      id: 5,
      name: "Hydrangea Bouquet",
      description: "Elegant bouquet with large and delicate hydrangeas",
      price: 18900,
      category: "Premium Bouquets",
      image: hydrangea,
      fullDescription:
        "An elegant bouquet featuring large hydrangea flowers with soft decorative wrapping.",
      additionalInfo:
        "Perfect for elegant gifts and special celebrations."
    },
    {
      id: 2,
      name: "Tulip Bouquet",
      description: "Fresh and simple bouquet of colorful spring tulips",
      price: 11900,
      category: "Spring Bouquets",
      image: tulip,
      fullDescription:
        "A fresh spring bouquet made with beautiful tulips and simple elegant wrapping.",
      additionalInfo:
        "Perfect for spring celebrations and everyday gifts."
    },
    {
      id: 9,
      name: "Carnation Bouquet",
      description: "Classic bouquet with soft and colorful carnations",
      price: 9900,
      category: "Classic Bouquets",
      image: carnation,
      fullDescription:
        "A classic bouquet of fresh carnations arranged in a simple and elegant style.",
      additionalInfo:
        "Suitable for birthdays, celebrations and everyday gifts."
    },
    {
      id: 7,
      name: "Orchid Arrangement",
      description: "Elegant orchid arrangement for a special occasion",
      price: 27900,
      category: "Premium Arrangements",
      image: orchid,
      fullDescription:
        "A sophisticated arrangement featuring elegant orchids with decorative details.",
      additionalInfo:
        "A premium choice for important celebrations and special gifts."
    },
    {
      id: 4,
      name: "Spray Rose Bouquet",
      description: "Delicate bouquet made with beautiful small spray roses",
      price: 16900,
      category: "Rose Bouquets",
      image: sprayRose,
      fullDescription:
        "A delicate bouquet of spray roses with several small flowers on each stem.",
      additionalInfo:
        "Perfect for romantic occasions, birthdays and elegant gifts."
    },
    {
      id: 6,
      name: "Gerbera Bouquet",
      description: "Colorful bouquet of bright and cheerful gerbera flowers",
      price: 10900,
      category: "Seasonal Bouquets",
      image: gerbera,
      fullDescription:
        "A colorful bouquet of fresh gerberas designed to create a bright and cheerful mood.",
      additionalInfo:
        "Perfect for birthdays, congratulations and happy occasions."
    },
    {
      id: 1,
      name: "Classic Rose Bouquet",
      description: "Elegant rose bouquet created for beautiful moments",
      price: 19900,
      category: "Rose Bouquets",
      image: rose,
      fullDescription:
        "A classic bouquet of elegant roses arranged with simple and beautiful wrapping.",
      additionalInfo:
        "Perfect for romantic occasions, anniversaries and special moments."
    }
  ]

  const discountPercents = {
    10: 25, 8: 15, 3: 30, 5: 20, 2: 10, 9: 35
  }

  const saleFlowers = flowers.map((flower) => {
    const discount = discountPercents[flower.id] || 0
    const onSale = discount > 0
    const remaining = onSale ? Math.max(0, saleDeadlines[flower.id] - now) : 0
    const isExpired = onSale && remaining === 0
    const salePrice = onSale ? Math.round(flower.price * (100 - discount) / 100) : flower.price

    return {
      ...flower,
      originalPrice: flower.price,
      price: isExpired ? flower.price : salePrice,
      discount,
      onSale,
      remaining,
      isExpired
    }
  })

  const categories = [
    'All',
    ...new Set(saleFlowers.map((flower) => flower.category))
  ]

  let visibleFlowers = saleFlowers.filter((flower) => {
    const matchesSearch = flower.name
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesCategory =
      category === 'All' || flower.category === category

    return matchesSearch && matchesCategory
  })

  if (sort === 'price-low') {
    visibleFlowers = [...visibleFlowers].sort(
      (a, b) => a.price - b.price
    )
  }

  if (sort === 'price-high') {
    visibleFlowers = [...visibleFlowers].sort(
      (a, b) => b.price - a.price
    )
  }

  if (sort === 'discount-high') {
    visibleFlowers = [...visibleFlowers].sort(
      (a, b) => (b.isExpired ? 0 : b.discount) - (a.isExpired ? 0 : a.discount)
    )
  }

  if (sort === 'discount-low') {
    visibleFlowers = [...visibleFlowers].sort(
      (a, b) => (a.isExpired ? 0 : a.discount) - (b.isExpired ? 0 : b.discount)
    )
  }

  if (sort === 'name-az') {
    visibleFlowers = [...visibleFlowers].sort(
      (a, b) => a.name.localeCompare(b.name)
    )
  }

  if (sort === 'name-za') {
    visibleFlowers = [...visibleFlowers].sort(
      (a, b) => b.name.localeCompare(a.name)
    )
  }

  function resetFilters() {
    setSearch('')
    setCategory('All')
    setSort('default')
  }

  return (
    <section className="flowers" id="flowers">

      <div className="flowers-heading">
        <p>THE COLLECTION</p>
        <h2>Flowers for every moment.</h2>
      </div>

      <div className="catalog-tools">

        <div className="search-box">
          <label htmlFor="flower-search">
            Search
          </label>

          <input
            id="flower-search"
            type="text"
            placeholder="Search bouquets..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </div>

        <div className="filter-box">
          <label htmlFor="category-filter">
            Category
          </label>

          <select
            id="category-filter"
            value={category}
            onChange={(event) =>
              setCategory(event.target.value)
            }
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="sort-box">
          <label htmlFor="sort-products">
            Sort by
          </label>

          <select
            id="sort-products"
            value={sort}
            onChange={(event) =>
              setSort(event.target.value)
            }
          >
            <option value="default">
              Default
            </option>

            <option value="price-low">
              Price: Low to High
            </option>

            <option value="price-high">
              Price: High to Low
            </option>

            <option value="discount-high">
              Discount: High to Low
            </option>

            <option value="discount-low">
              Discount: Low to High
            </option>

            <option value="name-az">
              Name: A to Z
            </option>

            <option value="name-za">
              Name: Z to A
            </option>
          </select>
        </div>

        <button
          className="reset-button"
          onClick={resetFilters}
        >
          Reset
        </button>

      </div>

      {visibleFlowers.length === 0 ? (
        <div className="no-results">
          <h3>No bouquets found.</h3>
          <p>
            Try another name or category.
          </p>

          <button onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="flower-list">

          {visibleFlowers.map((flower) => (
            <ProductCard
              key={flower.id}
              product={flower}
              onViewDetails={setSelectedProduct}
              addToCart={addToCart}
              buyNow={buyNow}
            />
          ))}

          {search === '' &&
            category === 'All' &&
            sort === 'default' && (
              <div className="collection-message">
                <p>Every flower has a feeling.</p>
                <h3>Find yours.</h3>
              </div>
            )}

        </div>
      )}

      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

    </section>
  )
}

export default Flowers