import Banner from "./components/Banner";
import Blogs from "./components/Blogs";
import Brands from "./components/Brands";
import FeaturedProducts from "./components/FeaturedProducts";
import Promotion from "./components/Promotion";
import PromotionalVide from "./components/PromotionalVide";

export default function Home() {
  return (
    <div>
      <Banner />
      <FeaturedProducts />
      <Brands/>
      <Promotion />
      <PromotionalVide/>
      <Blogs />
    </div>
  )
}
