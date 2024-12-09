import React, { useEffect, useState } from "react";
import { getAllProducts, deleteProduct } from "../api/productsApi.ts";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  body: string;
}

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set());
  const [showOnlyLiked, setShowOnlyLiked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const toggleLike = (id: number) => {
    setLikedProducts((prev) => {
      const newLikes = new Set(prev);
      if (newLikes.has(id)) newLikes.delete(id);
      else newLikes.add(id);
      return newLikes;
    });
  };

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const filteredProducts = showOnlyLiked
    ? products.filter((product) => likedProducts.has(product.id))
    : products;

  return (
    <div className="container">
      <h1>Products List</h1>
      <div>
        <button
          className="button"
          onClick={() => setShowOnlyLiked((prev) => !prev)}
        >
          {showOnlyLiked ? "Show All" : "Show Liked"}
        </button>
      </div>
      <div>
        {filteredProducts.map((product) => (
          <div key={product.id} className="card">
            <div className="card-header">
              <h2>{product.title}</h2>
              <div>
                <span
                  className={`icon like ${likedProducts.has(product.id) ? "active" : ""}`}
                  onClick={() => toggleLike(product.id)}
                >
                  ♥
                </span>
                <span
                  className="icon delete"
                  onClick={() => handleDelete(product.id)}
                >
                  🗑
                </span>
              </div>
            </div>
            <div className="card-body">{product.body}</div>
            <div className="card-footer">
              <button
                className="button"
                onClick={() => navigate(`/products/${product.id}`)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
