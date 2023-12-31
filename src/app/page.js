import { ListCategoryBottom } from "@/components/molecules/ListCategoryBottom";
import { HaderSection } from "@/components/organisms/HaderSection";
import { ListProductHome } from "@/components/organisms/ListProduct";
import { ListProductTop } from "@/components/organisms/ProductTop";

export const metadata = {
  title: "Technology",
  description: "Generated by create next app",
};
const Home = () => {
  return (
    <>
      <HaderSection />
      <div className="container mx-auto">
        <ListProductTop />
        <ListProductHome />
      </div>

      <ListCategoryBottom />
    </>
  );
};
export default Home;
