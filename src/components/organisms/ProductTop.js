"use client";

import "../../styles/header.css";
import { FaArrowRight } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export const ProductTop = () => {
  return (
    <>
      <div className="relative overflow-hidden my-8 flex-1 shop">
        <div className="shop-img">
          <img
            src="https://laptop88.vn/media/news/2910_hinhanhmaytinhxachtay4.jpg"
            alt=""
          />
        </div>
        <div className="shop-body">
          <h3>
            Cameras
            <br />
            Collection
          </h3>
          <a href="#" className="cta-btn">
            Shop now <FaArrowRight />
          </a>
        </div>
      </div>
    </>
  );
};

export const ListProductTop = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <section className="justify-between grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
      <div data-aos="fade-right">
        <ProductTop />
      </div>
      <div data-aos="zoom-in">
        <ProductTop />
      </div>
      <div data-aos="fade-left">
        <ProductTop />
      </div>
    </section>
  );
};
