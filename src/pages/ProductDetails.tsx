import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../api/productsApi.ts";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      try {
        console.log("Fetching product for ID:", id);
        const data = await getProductById(Number(id));
        console.log("Fetched product data:", data);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    getProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;
  if (Object.keys(product).length === 0) return <p>Product not found</p>;

  return (
    <div className="container">
      <div className="card">
        <h2>{product.title}</h2>
        <p>{product.body}</p>
        <button className="button" onClick={() => navigate("/")}>
          Back to Products
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
