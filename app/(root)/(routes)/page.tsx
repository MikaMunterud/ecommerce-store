"use client";

import HeroBanner from "@/components/hero-banner";
import ProductCard from "@/components/product-card";
import { useEffect, useState } from "react";

type Products = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  categoryId: string;
};

const heroBanner = {
  label: "E-commerce Store",
  url: "https://media.istockphoto.com/id/1316968335/sv/foto/kundvagn-full-av-mat-p%C3%A5-gul-bakgrund-mataff%C3%A4rskoncept.jpg?s=612x612&w=0&k=20&c=5NBtN9fhss48STDiV-KAdYkpmc6tB8LEcdKF2nEaT44=",
};

export default function Home() {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    async function getProducts() {
      const response = await fetch(
        "https://ecommerce-dashboard-kohl.vercel.app/api/da93f622-75b0-46a4-a2ed-ef13507e9278/products"
      );
      const data = await response.json();
      const products = data.body.products;
      setProducts(products);
    }
    getProducts();
  }, []);

  return (
    <>
      <HeroBanner imageUrl={heroBanner.url} label={heroBanner.label} />
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <h3 className="font-bold text-3xl">Featured Products</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              label={product.name}
              price={product.price}
              imageUrl={product.imageUrl}
            />
          ))}
        </div>
      </div>
    </>
  );
}
