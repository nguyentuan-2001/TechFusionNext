"use client";
import Link from "next/link";
import "../../styles/product.css";
import { FaAngleDoubleRight } from "react-icons/fa";
import { Button } from "../atoms/Button";
import { TruncateText } from "../atoms/TruncateText";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../contexts/ProductContext";
import Path, {
  BuyProduct,
  ListProducts,
  ListProductsByCategory,
} from "@/utils/auth";
import { Loading } from "../atoms/Loading";
import { FormatPrice } from "../atoms/FormatPrice";
import axios from "axios";
import Cookies from "js-cookie";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import Pagination from "../atoms/Pagination";
import { Select, pushData } from "../atoms/Select";
import Notification from "../atoms/Notification";
import { AuthContext } from "../contexts/AuthContext";

const Product = ({ data }) => {
  const router = useRouter();
  const handleBuyNow = async () => {
    try {
      const storedIdCustomer = Cookies.get("id_customer");
      if (storedIdCustomer) {
        const IdCustomer = atob(storedIdCustomer);
        const buyData = {
          customer_id: IdCustomer,
          products: [{ product_id: data.product_id, product_quantity: 1 }],
        };

        await BuyProduct(buyData);
        Notification.success("Add to cart successfully!");
      } else {
        Notification.error("Please log in to purchase!");
      }
      // router.push("/?product=" + data.product_id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <li>
      {data.product_sale && data.product_sale > 0 ? (
        <span className="absolute bg-[#FF6868] text-xs text-white z-10 rounded-full w-8 h-8 flex justify-center items-center">
          -{data.product_sale}%
        </span>
      ) : null}

      <div className="card">
        <img src={data.product_image} className="card__image" alt="" />
        <div className="card__overlay">
          <div className="card__header">
            <svg className="card__arc" xmlns="http://www.w3.org/2000/svg">
              <path />
            </svg>

            <div className="card__header-text">
              <h3 className="card__title">
                <Link href={"/product/" + data.product_id}>
                  {TruncateText(data.product_name, 70)}
                </Link>
              </h3>
              {data.product_sale ? (
                <>
                  <del>{FormatPrice(data.product_price)}</del>
                  <p className="card__status">
                    {FormatPrice(
                      data.product_price -
                        (data.product_price * data.product_sale) / 100
                    )}
                  </p>
                </>
              ) : (
                <>
                  <p className="card__status">
                    {FormatPrice(data.product_price)}
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="pl-[2em] flex">
            <div className="w-[40%]">
              <p>CPU</p>
              <p>RAM</p>
              <p>HARD DRIVER</p>
              <p>CARD</p>
              <p>DESKTOP</p>
            </div>
            <div className="w-[60%]">
              <p>{data.product_detail?.product_cpu}</p>
              <p>{data.product_detail?.product_ram}</p>
              <p>{data.product_detail?.hard_drive}</p>
              <p>{data.product_detail?.product_card}</p>
              <p>{data.product_detail?.desktop}</p>
            </div>
          </div>
          <div className="flex justify-center gap-2 p-5">
            <Button title={"Buy"} type={"button"} onClick={handleBuyNow} />
            <Button
              title={"Detail"}
              type={"button"}
              onClick={() => router.push("/product/" + data.product_id)}
            />
          </div>
        </div>
      </div>
    </li>
  );
};
export const ListProductHome = () => {
  const [dataAll, setDataAll] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ListProducts();
        setDataAll(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center py-10">
        <p className="text-xl font-bold">SẢN PHẨM HOT</p>
        <Link href="/product" className="flex items-center gap-3">
          <p>Xem tất cả </p>
          <div className="arrow_right">
            <FaAngleDoubleRight />
          </div>
        </Link>
      </div>
      {loading ? (
        <div className="h-[50vh] flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <ul className="cards">
          {dataAll?.data.map((item, index) => (
            <Product data={item} key={index} />
          ))}
        </ul>
      )}

      <div className="flex justify-between items-center py-10">
        <p className="text-xl font-bold">SẢN PHẨM NỔI BẬT</p>
        <Link href="/product" className="flex items-center gap-3">
          <p>Xem tất cả </p>
          <div className="arrow_right">
            <FaAngleDoubleRight />
          </div>
        </Link>
      </div>
      {loading ? (
        <div className="h-[50vh] flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <ul className="cards">
          {dataAll?.data.map((item, index) => (
            <Product data={item} key={index} />
          ))}
        </ul>
      )}
    </>
  );
};

export const AllProducts = ({ category }) => {
  const [dataAll, setDataAll] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedSort, setSelectedSort] = useState(null);
  const searchParams = useSearchParams();
  const params = useParams();

  const [paginationPage, setPaginationPage] = useState(
    searchParams.get("page") ?? 1
  );

  useEffect(() => {
    const fetchDataAllProduct = async () => {
      try {
        const result = await ListProducts({ page: paginationPage });
        setDataAll(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (!category) {
      fetchDataAllProduct();
    }

    const fetchDataByCategory = async () => {
      try {
        const result = await ListProductsByCategory({ params });
        setDataAll(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (category) {
      fetchDataByCategory();
    }
  }, [paginationPage]);

  const dataSelect = [{ name: "Sắp xếp từ A-Z" }, { name: "Sắp xếp từ Z_A" }];

  let ContentSelect = [];
  pushData({
    arrayForm: ContentSelect,
    data: dataSelect,
  });

  return (
    <>
      <div className="flex gap-5 justify-end items-center py-10">
        <div className=" w-52">
          <Select
            selected={selectedSort}
            content={ContentSelect}
            onChange={(value) => {
              setSelectedSort(value);
            }}
          />
        </div>
      </div>

      {loading ? (
        <div className="h-[50vh] flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <>
          {dataAll.data?.length > 0 ? (
            <>
              <ul className="cards">
                {dataAll?.data.map((item, index) => (
                  <Product data={item} key={index} />
                ))}
              </ul>
              <Pagination
                total={dataAll?.total}
                paginationPage={paginationPage}
                setPaginationPage={setPaginationPage}
              />
            </>
          ) : (
            <center>No Products</center>
          )}
        </>
      )}
    </>
  );
};
