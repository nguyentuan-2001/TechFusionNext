import Link from "next/link";
import "../../styles/product.css";
import { FaAngleDoubleRight } from "react-icons/fa";

export const ListProduct = () => {
  return (
    <>
      <div className="flex justify-between items-center py-10">
        <p className="text-xl font-bold">SẢN PHẨM HOT</p>
        <Link href="/home" className="flex items-center gap-3">
          <p>Xem tất cả </p>
          <div className="arrow_right">
            <FaAngleDoubleRight />
          </div>
        </Link>
      </div>
      <ul className="cards">
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Asperiores, blanditiis?
              </p>
            </div>
          </a>
        </li>
        <li>
          <div className="card">
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Asperiores, blanditiis?
              </p>
            </div>
          </div>
        </li>
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Asperiores, blanditiis?
              </p>
            </div>
          </a>
        </li>
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Asperiores, blanditiis?
              </p>
            </div>
          </a>
        </li>
      </ul>
    </>
  );
};
