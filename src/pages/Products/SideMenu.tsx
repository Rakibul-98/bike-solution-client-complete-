import { BiArrowToBottom, BiArrowToTop } from "react-icons/bi";
import { Dispatch, SetStateAction } from "react";

interface SideMenuProps {
  brands: string[];
  selectedCategories: string[];
  setSelectedCategories: Dispatch<SetStateAction<string[]>>;
  selectedBrands: string[];
  setSelectedBrands: Dispatch<SetStateAction<string[]>>;
  sort: {
    field: string;
    order: "asc" | "desc";
  } | null;
  handleSort: (field: "price") => void;
}

const categories = ["Mountain", "Road", "Hybrid", "Electric"];

export default function SideMenu({
  brands,
  selectedCategories,
  setSelectedCategories,
  selectedBrands,
  setSelectedBrands,
  sort,
  handleSort,
}: SideMenuProps) {
  return (
    <div className="w-48 md:64 p-4 rounded-lg shadow-md h-fit bg-primary mt-[58px]">
      <h2 className="text-lg font-semibold mb-4 border-b pb-2">Filters</h2>

      {/* Sort */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">
            Sort By <span>Price:</span>
          </h3>
          <div className="flex gap-1">
            <button
              onClick={() => handleSort("price")}
              className={`p-1 rounded ${
                sort?.field === "price" && sort.order === "asc"
                  ? "bg-neutral text-secondary"
                  : "hover:bg-neutral"
              }`}
              title="Sort low to high"
            >
              <BiArrowToBottom />
            </button>
            <button
              onClick={() => handleSort("price")}
              className={`p-1 rounded ${
                sort?.field === "price" && sort.order === "desc"
                  ? "bg-neutral text-secondary"
                  : "hover:bg-neutral"
              }`}
              title="Sort high to low"
            >
              <BiArrowToTop />
            </button>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="font-medium mb-2">Categories</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {categories.map((category) => (
            <div key={category} className="flex items-center">
              <input
                type="checkbox"
                id={`cat-${category}`}
                checked={selectedCategories.includes(category)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedCategories([...selectedCategories, category]);
                  } else {
                    setSelectedCategories(
                      selectedCategories.filter((c) => c !== category)
                    );
                  }
                }}
                className="mr-2"
              />
              <label htmlFor={`cat-${category}`}>{category}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-medium mb-2">Brands</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center">
              <input
                type="checkbox"
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedBrands([...selectedBrands, brand]);
                  } else {
                    setSelectedBrands(
                      selectedBrands.filter((b) => b !== brand)
                    );
                  }
                }}
                className="mr-2"
              />
              <label htmlFor={`brand-${brand}`}>{brand}</label>
            </div>
          ))}
        </div>
      </div>
        <button
          onClick={() => {
            setSelectedBrands([]);
            setSelectedCategories([]);
          }}
          className="mt-5 w-full bg-secondary hover:bg-secondary/80 text-base-100 px-2 py-1 rounded text-sm"
        >
          Clear Filters
        </button>
    </div>
  );
}
