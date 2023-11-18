import Link from "next/link";
import "../../styles/product.css";
import { FaAngleDoubleRight } from "react-icons/fa";

const Product = () => {
  return (
    <li>
      <a href="" className="card">
        <img
          src="https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645-t.jpg"
          className="card__image"
          alt=""
        />
        <div className="card__overlay">
          <div className="card__header">
            <svg className="card__arc" xmlns="http://www.w3.org/2000/svg">
              <path />
            </svg>

            <div className="card__header-text">
              <h3 className="card__title">Jessica Parker</h3>
              <span className="card__status">1 hour ago</span>
            </div>
          </div>
          <p className="card__description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores,
            blanditiis?
          </p>
        </div>
      </a>
    </li>
  );
};
export const ListProductHome = () => {
  return (
    <>
      <div className="flex justify-between items-center py-10">
        <p className="text-xl font-bold">SẢN PHẨM HOT</p>
        <Link href="/shop" className="flex items-center gap-3">
          <p>Xem tất cả </p>
          <div className="arrow_right">
            <FaAngleDoubleRight />
          </div>
        </Link>
      </div>
      <ul className="cards">
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </ul>

      <div className="flex justify-between items-center py-10">
        <p className="text-xl font-bold">SẢN PHẨM NỔI BẬT</p>
        <Link href="/shop" className="flex items-center gap-3">
          <p>Xem tất cả </p>
          <div className="arrow_right">
            <FaAngleDoubleRight />
          </div>
        </Link>
      </div>
      <ul className="cards">
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </ul>
    </>
  );
};

export const ListProductShop = () => {
  return (
    <>
      <div className="flex gap-5 justify-between items-center py-10">
        <div className="flex gap-5 items-center">
          <p className="text-3xl font-bold">Laptop</p>
          <p>(252 sản phẩm)</p>
        </div>
        <select className="w-24 h-10 border">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="vw">VW</option>
          <option value="audi" selected>
            Audi
          </option>
        </select>
      </div>
      <ul className="cards">
        <Product />
        <Product />
        <Product />
        <Product />
      </ul>
    </>
  );
};
