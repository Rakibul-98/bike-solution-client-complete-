import { useParams } from "react-router-dom";
import {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
} from "../../redux/features/products/productsApi";
import DetailsCard from "./DetailsCard";
import ProductCard from "../Products/ProductCard";
// import DetailsSkeleton from "./DetailsCard";
import { useEffect, useState } from "react";
import { ItemType } from "../../interfaces/interfaces";

export default function ProductDetails() {
  const { productId } = useParams();
  const {
    data: product,
    error: productError,
    isLoading: isProductLoading,
  } = useGetProductByIdQuery(productId as string);
  const {
    data: allProducts,
    error: allProductsError,
    isLoading: isAllProductsLoading,
  } = useGetAllProductsQuery(undefined);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(4);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(3);
      } else {
        setVisibleCount(4);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  if (productError || allProductsError) return <div>Error loading data</div>;

  const allProductsData = allProducts?.data?.result;

  const getRandomSuggestedProducts = (
    products: ItemType[],
    currentProductId: string | undefined
  ) => {
    if (!products) return [];
    const filteredProducts = products.filter((p) => p._id !== currentProductId);
    return filteredProducts
      .sort(() => 0.5 - Math.random())
      .slice(0, visibleCount);
  };

  const suggestedProducts = getRandomSuggestedProducts(
    allProductsData,
    productId
  );

  return (
    <div className="my-10">
      {!isProductLoading && <DetailsCard productData={product?.data} />}
      <div>
        <h2 className="font-mono font-semibold text-2xl mt-10 mb-3">
          Products You May Like
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {isAllProductsLoading
            ? Array.from({ length: visibleCount }).map((_, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg shadow-md animate-pulse"
                >
                  <div className="h-28 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 w-28 my-2 rounded"></div>
                  <div className="h-4 bg-gray-300 w-full rounded"></div>
                  <div className="h-4 bg-gray-300 w-full mt-1 rounded"></div>
                </div>
              ))
            : suggestedProducts.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
        </div>
      </div>
    </div>
  );
}
