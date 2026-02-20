import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FilterSidebar from "../components/ui/FilterSidebar";
import ProductCard from "./PhonesCard";
import { useCart } from "../CartContext";

export default function ProductPage() {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("featured");

  const applySort = (items, sortType) => {
    const sorted = [...items];
    if (sortType === "lowest") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortType === "highest") {
      sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
  };

  const handleFilter = (filters) => {
    let nextProducts = [...products];

    if (filters?.category) {
      nextProducts = nextProducts.filter(
        (item) =>
          item.category &&
          item.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    if (filters?.min !== "") {
      const min = Number(filters.min);
      if (!Number.isNaN(min)) {
        nextProducts = nextProducts.filter((item) => Number(item.price) >= min);
      }
    }

    if (filters?.max !== "") {
      const max = Number(filters.max);
      if (!Number.isNaN(max)) {
        nextProducts = nextProducts.filter((item) => Number(item.price) <= max);
      }
    }

    if (filters?.rating) {
      nextProducts = nextProducts.filter(
        (item) => (item.rating?.rate || 0) >= Number(filters.rating)
      );
    }

    setFilteredProducts(applySort(nextProducts, sortBy));
  };

  const handleSortChange = (event) => {
    const nextSort = event.target.value;
    setSortBy(nextSort);
    setFilteredProducts((prev) => applySort(prev, nextSort));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");

        // Keep duplicate entries for the current UI density.
        const extendedProducts = [...response.data, ...response.data];

        setProducts(extendedProducts);
        setFilteredProducts(extendedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    navigate("/cart");
  };

  if (loading) {
    return <div className="text-center py-10 px-4">Loading products...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <p className="text-sm text-gray-600">
          {filteredProducts.length} items in{" "}
          <span className="font-semibold">Mobile Accessories</span>
        </p>

        <select
          className="border px-3 py-2 rounded text-sm w-full sm:w-auto"
          value={sortBy}
          onChange={handleSortChange}
        >
          <option value="featured">Featured</option>
          <option value="lowest">Lowest price</option>
          <option value="highest">Highest price</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="lg:col-span-1">
          <FilterSidebar onFilter={handleFilter} />
        </div>

        <div className="lg:col-span-3 min-w-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={`${product.id}-${index}`}
                product={product}
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
