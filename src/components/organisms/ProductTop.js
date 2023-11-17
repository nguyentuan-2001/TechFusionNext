import "../../styles/header.css";
import { FaArrowRight } from "react-icons/fa";

export const ProductTop = () => {
  return (
    <>
      <div className="relative overflow-hidden my-8 flex-1 shop">
        <div className="shop-img">
          <img src="https://laptop88.vn/media/news/2910_hinhanhmaytinhxachtay4.jpg" alt="" />
        </div>
        <div className="shop-body">
          <h3>
            Cameras
            <br />
            Collection
          </h3>
          <a href="#" className="cta-btn">
            Shop now <FaArrowRight/>
          </a>
        </div>
      </div>
    </>
  );
};

