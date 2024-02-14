import { FilterProduct } from "@/components/organisms/FilterProduct";
import { AllProducts } from "@/components/organisms/ListProduct";

const Categories = () => {
  return (
    <>
      <div className="flex gap-10 justify-center px-[5rem]">
        <div className=" w-[20%]">
          <div className="pt-5">
            <p className="font-bold text-2xl">CATEGORY</p>
            <FilterProduct />
          </div>
        </div>
        <div className="w-[80%]">
          <AllProducts category={true} />
        </div>
      </div>
    </>
  );
};
export default Categories;
