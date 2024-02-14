"use client";
import { useEffect, useState } from "react";
import { InputQuantity } from "../atoms/Input";
import { FaMobileScreenButton } from "react-icons/fa6";
import { FaCamera, FaRegClock } from "react-icons/fa";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useParams, useRouter } from "next/navigation";
import {
  BuyProduct,
  GetProductDetail,
  GetProductRelated,
  ListCarts,
} from "@/utils/auth";
import { FormatPrice } from "../atoms/FormatPrice";
import { LoadingAllPage } from "../atoms/Loading";
import Notification from "../atoms/Notification";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";

export const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [detailProduct, setDetailProduct] = useState();
  const [relatedProduct, setRelatedProduct] = useState();
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const storedIdCustomer = Cookies.get("id_customer");
  let IdCustomer;
  if (storedIdCustomer) {
    IdCustomer = atob(storedIdCustomer);
  }

  const images = [
    {
      original:
        "https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645-t.jpg",
      thumbnail:
        "https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645-t.jpg",
      originalHeight: 380,
      sizes: "auto",
    },
    {
      original:
        "https://i.pinimg.com/736x/6e/74/63/6e7463744c9fdf25c505adfd51902f50.jpg",
      thumbnail:
        "https://i.pinimg.com/736x/6e/74/63/6e7463744c9fdf25c505adfd51902f50.jpg",
      originalHeight: 380,
      sizes: "auto",
    },
    {
      original:
        "https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645-t.jpg",
      thumbnail:
        "https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645-t.jpg",
      originalHeight: 380,
      sizes: "auto",
    },
  ];

  //lấy ra data detail
  useEffect(() => {
    const fetchDetail = async () => {
      const dataDetail = await GetProductDetail({ product_id: params.id });
      setDetailProduct(dataDetail?.data);
      setLoading(false);
    };
    if (params) {
      fetchDetail();
    }
  }, []);

  //lấy ra product related
  useEffect(() => {
    const fetchRelated = async () => {
      const dataDetail = await GetProductRelated({
        product_id: params.id,
        category_id: detailProduct?.category_id,
      });
      setRelatedProduct(dataDetail?.data);
    };
    if (params) {
      fetchRelated();
    }
  }, [detailProduct]);

  const onSubmit = async () => {
    const storedIdCustomer = Cookies.get("id_customer");
    if (storedIdCustomer) {
      const IdCustomer = atob(storedIdCustomer);
      const buyData = {
        customer_id: IdCustomer,
        products: [{ product_id: params.id, product_quantity: quantity }],
      };

      await BuyProduct(buyData);
      Notification.success("Add to cart successfully!");
    } else {
      Notification.error("Please log in to purchase!");
    }
  };
  const BuyNow = async () => {
    const storedIdCustomer = Cookies.get("id_customer");
    if (storedIdCustomer) {
      const IdCustomer = atob(storedIdCustomer);
      const buyData = {
        customer_id: IdCustomer,
        products: [{ product_id: params.id, product_quantity: quantity }],
      };

      await BuyProduct(buyData);
      Notification.success("Add to cart successfully!");
    } else {
      Notification.error("Please log in to purchase!");
    }
    router.push("/cart");
  };
  return (
    <>
      {loading ? (
        <LoadingAllPage isOpen={loading} setIsOpen={setLoading} />
      ) : (
        <>
          <section className="pt-10 font-poppins dark:bg-gray-800">
            <div className="max-w-6xl px-4 mx-auto">
              <div className="flex flex-wrap mb-24 -mx-4">
                <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                  <div className="sticky top-0 overflow-hidden ">
                    <ImageGallery
                      items={images}
                      showFullscreenButton={true} // Optional: Allow fullscreen mode
                      showPlayButton={true} // Optional: Remove play button
                      showBullets={true} // Optional: Show bullet indicators
                      showThumbnails={true} // Optional: Show thumbnail navigation
                      infinite={true} // Optional: Allow infinite navigation
                      slideInterval={3000} // Optional: Slide interval in milliseconds
                      slideOnThumbnailOver={true} // Optional: Slide on thumbnail
                      showIndex={true} // Optional: Show index
                      autoPlay={true} // Optional: Auto play
                      renderItem={renderCustomItem}
                    />
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="w-full px-4 md:w-1/2"
                >
                  <div className="lg:pl-20">
                    <div className="mb-6 ">
                      <span className="px-2.5 py-0.5 mr-3 text-xs text-blue-600 bg-blue-100 dark:bg-gray-700 rounded-xl dark:text-gray-200">
                        New Arrival
                      </span>
                      <span className="px-2.5 py-0.5 text-xs text-white bg-[#FF6868] dark:bg-gray-700 rounded-xl dark:text-gray-200">
                        Sale({detailProduct?.product_sale}%)
                      </span>
                      <h2 className="max-w-xl mt-6 mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                        {detailProduct?.product_name}
                      </h2>

                      <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                        <span>
                          {FormatPrice(
                            detailProduct?.product_price -
                              (detailProduct?.product_price *
                                detailProduct?.product_sale) /
                                100
                          )}
                        </span>
                        <span className="ml-3 text-base font-normal text-gray-500 line-through dark:text-gray-400">
                          {FormatPrice(detailProduct?.product_price)}
                        </span>
                      </p>
                    </div>
                    <div className="mb-6">
                      <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">
                        System Specs :
                      </h2>
                      <div className="bg-gray_light dark:bg-gray-700 rounded-xl">
                        <div className="p-3 lg:p-5 ">
                          <div className="p-2 rounded-xl lg:p-6 dark:bg-gray-800 bg-gray-50">
                            <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
                              <div className="w-full mb-4 md:w-2/5">
                                <div className="flex ">
                                  <span className="mr-3 text-gray-500 dark:text-gray-400 text-3xl">
                                    <FaMobileScreenButton />
                                  </span>
                                  <div>
                                    <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                      No. of cores
                                    </p>
                                    <h2 className="text-base font-semibold text-gray-700 dark:text-gray-400">
                                      12 Cores
                                    </h2>
                                  </div>
                                </div>
                              </div>
                              <div className="w-full mb-4 md:w-2/5">
                                <div className="flex ">
                                  <span className="mr-3 text-gray-500 dark:text-gray-400 text-3xl">
                                    <FaCamera />
                                  </span>
                                  <div>
                                    <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                      Graphic
                                    </p>
                                    <h2 className="text-base font-semibold text-gray-700 dark:text-gray-400">
                                      Intel UHD
                                    </h2>
                                  </div>
                                </div>
                              </div>
                              <div className="w-full mb-4 lg:mb-0 md:w-2/5">
                                <div className="flex ">
                                  <span className="mr-3 text-gray-500 dark:text-gray-400">
                                    <ProcessorIcon />
                                  </span>
                                  <div>
                                    <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                      Processor
                                    </p>
                                    <h2 className="text-base font-semibold text-gray-700 dark:text-gray-400">
                                      INTEL 80486
                                    </h2>
                                  </div>
                                </div>
                              </div>
                              <div className="w-full mb-4 lg:mb-0 md:w-2/5">
                                <div className="flex ">
                                  <span className="mr-3 text-gray-500 dark:text-gray-400 text-3xl">
                                    <FaRegClock />
                                  </span>
                                  <div>
                                    <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                      Frequency
                                    </p>
                                    <h2 className="text-base font-semibold text-gray-700 dark:text-gray-400">
                                      3.5 GHz
                                    </h2>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="py-6 mb-6 border-t border-b border-gray-200 dark:border-gray-700">
                      <span className="text-base text-gray-600 dark:text-gray-400">
                        In Stock
                      </span>
                      <p className="mt-2 text-sm text-blue-500 dark:text-blue-200">
                        Ships from china.
                        <span className="text-gray-600 dark:text-gray-400">
                          Most customers receive within 3-31 days.
                        </span>
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-between mb-6">
                      <div className="mb-4 mr-4 lg:mb-0 ">
                        <div className="w-28">
                          <InputQuantity
                            quantity={quantity}
                            setQuantity={setQuantity}
                            maxQuantity={
                              detailProduct?.product_inventory_quantity
                            }
                          />
                        </div>
                      </div>

                      <button
                        className="w-full px-4 py-3 text-center text-gray hover:text-white bg-blue-100 border border-blue-600 dark:hover:bg-gray-900 dark:text-gray-400 dark:border-gray-700 dark:bg-gray-700 hover:bg-blue-600 hover:text-gray-100 lg:w-1/2 rounded-xl"
                        type="submit"
                      >
                        Add to cart
                      </button>
                    </div>
                    <div className="flex gap-4 mb-6">
                      <button
                        className="w-full px-4 py-3 text-center text-white bg-blue-600 border border-transparent dark:border-gray-700 hover:border-blue-500 hover:text-blue-700 hover:bg-blue-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl"
                        type="button"
                        onClick={BuyNow}
                      >
                        Buy now
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>

          <section className="pb-10 grid grid-cols-2 grid-rows-2 gap-x-5 lg:grid-cols-4 lg:grid-rows-1 max-w-6xl mx-auto">
            {relatedProduct?.map((item, index) => (
              <div
                key={index}
                className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full cursor-pointer"
                onClick={() => router.push("/product/" + item.product_id)}
              >
                <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl min-h-[300px]">
                  <img
                    src={item.product_image}
                    alt="profile-picture"
                    className="h-full"
                  />
                </div>
                <div className="p-6 text-center">
                  <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    {item.product_name}
                  </h4>
                  <p className="">{FormatPrice(item.product_price)}</p>
                </div>
              </div>
            ))}
          </section>
        </>
      )}
    </>
  );
};

const renderCustomItem = (item) => {
  return (
    <div className="image-gallery-item">
      <img
        src={item.original}
        alt={item.description}
        sizes={item.sizes}
        srcSet={item.srcSet}
        className="image-gallery-image"
        style={{ width: "100%", height: item.originalHeight }}
      />
    </div>
  );
};

const ProcessorIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="w-7 h-7 bi bi-cpu"
      viewBox="0 0 16 16"
    >
      <path d="M5 0a.5.5 0 0 1 .5.5V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2A2.5 2.5 0 0 1 14 4.5h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14a2.5 2.5 0 0 1-2.5 2.5v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14A2.5 2.5 0 0 1 2 11.5H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2A2.5 2.5 0 0 1 4.5 2V.5A.5.5 0 0 1 5 0zm-.5 3A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 11.5 3h-7zM5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3zM6.5 6a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"></path>
    </svg>
  );
};
