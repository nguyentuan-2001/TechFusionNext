"use client";
import { useEffect, useState } from "react";
import { TableForm } from "../molecules/Table";
import {
  DeleteCategory,
  ListCategories,
  ListProducts,
  PostCategory,
  UpdateCategories,
} from "../../utils/auth";
import { CATEGORY_STATUS } from "../../common";
import Link from "next/link";
import { FaPenToSquare } from "react-icons/fa6";
import { HiArchiveBoxXMark } from "react-icons/hi2";
import { AiOutlineFileSearch } from "react-icons/ai";

import { ConfirmDelete } from "../molecules/ConfirmDelete";
import { ButtonIcon, ButtonModal } from "../atoms/Button";
import { FaPlus } from "react-icons/fa6";
import { Modal } from "../molecules/Modal";
import { InputForm, InputModal } from "../atoms/Input";
import { useForm } from "react-hook-form";
import { ToggleSwitch } from "../atoms/ToggleSwitch";
import Notification from "../atoms/Notification";
import { UploadImage } from "../molecules/UploadImage";
import { ConvertFirebase } from "../../utils/firebase";

export const ProductForm = () => {
  const [dataAll, setDataAll] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const [dataUpdate, setDataUpdate] = useState();
  const [isNew, setIsNew] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [downloadURLs, setDownloadURLs] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    methods,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ListProducts();
        setDataAll(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [isReload]);

  const handleChangeStatus = async (e, item) => {
    const value = e.target.checked ? 1 : 0;

    const payload = {
      category_id: item.category_id,
      category_name: item.category_name,
      category_status: value,
    };
    await UpdateCategories(payload);

    setIsReload(!isReload);
    Notification.success("Updated status successfully!");
  };

  const dataThead = [
    "No.",
    "Name",
    "Description",
    "Price",
    "Sale",
    "Status",
    "Gallery",
    "Detail",
    "Action",
  ];
  const dataBody = [];

  dataBody.push(
    dataAll?.data?.map((item, index) => (
      <tr key={index} className="border-b border-[#bdbdbd]">
        <td className="py-3 px-5  text-center">
          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">
            {index + 1}
          </p>
        </td>
        <td className="py-3 px-5  text-center ">
          <p className="antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold flex gap-2 items-center justify-center">
            <img src={item.product_image} className="h-10 w-auto" />{" "}
            {item.product_name}
          </p>
        </td>
        <td className="py-3 px-5  text-center ">
          <p className="block antialiased font-sans text-sm leading-normal font-semibold">
            {item.product_content}
          </p>
        </td>
        <td className="py-3 px-5  text-center ">
          <p className="block antialiased font-sans text-sm leading-normal font-semibold">
            {item.product_price}
          </p>
        </td>
        <td className="py-3 px-5  text-center ">
          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">
            {item.product_sale}
          </p>
        </td>
        <td className="py-3 px-5  text-center ">
          <ToggleSwitch
            onChange={(e) => handleChangeStatus(e, item)}
            checked={item.product_status === 1 ? true : false}
          />
        </td>
        <td className="py-3 px-5  text-center ">
          <Link href={"/product/" + item.product_id + "/gallery"}>Upload</Link>
        </td>
        <td className="py-3 px-5 ">
          <p className="text-center flex justify-center">
            <Link href={"/product/" + item.product_id}>
              <AiOutlineFileSearch className="h-5 font-bold" />
            </Link>
          </p>
        </td>
        <td className="py-3 px-5  text-center ">
          <p className="flex justify-center gap-5">
            <Link href={"/product/" + item.product_id}>
              <FaPenToSquare className="h-5" />
            </Link>
            <button
              onClick={() => {
                setIsOpen(true);
                setDataUpdate(item);
              }}
            >
              <HiArchiveBoxXMark className="h-5 hover:text-red" />
            </button>
          </p>
        </td>
      </tr>
    ))
  );

  const handleDelete = async () => {
    setIsOpen(false);
    const payload = {
      category_id: dataUpdate.category_id,
    };
    await DeleteCategory(payload);

    setIsReload(!isReload);
    Notification.success("Delete category successfully!");
  };

  const handleCloseModal = () => {
    setIsNew(false);
    setIsNewCategory(false);
  };

  const handleCreate = async (data) => {
    // const payload = {
    //   category_name: data.name,
    //   category_desc: data.description,
    //   category_status: 1,
    // };
    // await PostCategory(payload);

    // await handleCloseModal();
    // setIsReload(!isReload);
    // Notification.success("Create category successfully!");
    const urls = await ConvertFirebase({ images: selectedFiles });
    console.log(urls);
  };

  const handleUpdate = async (data) => {
    const payload = {
      category_id: dataUpdate.category_id,
      category_name: data.name,
      category_desc: data.description,
    };
    await UpdateCategories(payload);

    handleCloseModal();
    setIsReload(!isReload);
    Notification.success("Update category successfully!");
  };

  const ContentModal = (
    <form onSubmit={handleSubmit(isNew ? handleCreate : handleUpdate)}>
      <p className="uppercase text-center mb-5 font-bold border-b-2 pb-4">
        {isNew ? "Create" : "Update"} Product
      </p>
      <div className="flex gap-5">
        <div>
          <InputModal
            register={register("product_name", {
              required: "Name cannot be left blank",
            })}
            type="text"
            placeholder={"Product Name"}
            label={"Product Name"}
            required={true}
          />
          {errors.product_name && errors.product_name.type === "required" && (
            <span className="text-red text-xs italic">
              {errors.product_name.message}
            </span>
          )}
        </div>
        <div>
          <InputModal
            register={register("product_content")}
            type="text"
            placeholder={"Product Content"}
            label={"Product Content"}
          />
        </div>
      </div>
      <div className="flex gap-5 my-5">
        <div>
          <InputModal
            register={register("product_sale")}
            type="text"
            placeholder={"Product Sale"}
            label={"Product Sale"}
          />
        </div>
        <div>
          <InputModal
            register={register("product_price")}
            type="text"
            placeholder={"Product Price"}
            label={"Product Price"}
            required={true}
          />
          {errors.product_price && errors.product_price.type === "required" && (
            <span className="text-red text-xs italic">
              {errors.product_price.message}
            </span>
          )}
        </div>
      </div>

      <p className="text-[#5c677e] font-medium text-sm pb-2">Product Image</p>
      <UploadImage
        lengthImage={1}
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
      />

      <div className="flex justify-end mt-5 gap-4">
        <ButtonModal
          title={"Cancel"}
          type={"button"}
          sizeSm={true}
          onClick={() => handleCloseModal()}
          textBlack={true}
          className={"border-black border-[1px] bg-slate-300 w-20"}
        />
        <ButtonModal
          title={isNew ? "Create" : "Update"}
          type={"submit"}
          sizeSm={true}
          className={"w-20 bg-blue-500"}
        />
      </div>
    </form>
  );

  useEffect(() => {
    if (isNew) {
      reset({
        name: null,
        description: null,
      });
    } else {
      reset({
        name: dataUpdate?.category_name || "",
        description: dataUpdate?.category_desc || "",
      });
    }
  }, [dataUpdate, isNew]);

  return (
    <>
      <div className="flex justify-end mb-5">
        <ButtonIcon
          title={"Add Product"}
          icon={<FaPlus />}
          type={"submit"}
          onClick={() => {
            setIsNewCategory(true);
            setIsNew(true);
          }}
        />
        <Modal
          isOpen={isNewCategory}
          setIsOpen={handleCloseModal}
          content={ContentModal}
        />
      </div>
      <TableForm dataThead={dataThead} dataBody={dataBody} />
      {dataAll?.data?.length === 0 && (
        <p className="text-center font-medium py-10">No category</p>
      )}
      <ConfirmDelete
        title={"Do you want to delete the category?"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClick={handleDelete}
      />
    </>
  );
};
