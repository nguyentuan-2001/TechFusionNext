"use client";
import { useEffect, useState } from "react";
import { TableForm } from "../molecules/Table";
import { ListCategories, UpdateCategories } from "../../utils/auth";
import { CATEGORY_STATUS } from "../../common";
import Link from "next/link";
import { FaPenToSquare } from "react-icons/fa6";
import { HiArchiveBoxXMark } from "react-icons/hi2";

import { ConfirmDelete } from "../molecules/ConfirmDelete";
import { ButtonIcon, ButtonModal } from "../atoms/Button";
import { FaPlus } from "react-icons/fa6";
import { Modal } from "../molecules/Modal";
import { InputForm } from "../atoms/Input";
import { useForm } from "react-hook-form";
import { ToggleSwitch } from "../atoms/ToggleSwitch";
import Notification from "../atoms/Notification";

export const CategoryForm = () => {
  const [dataAll, setDataAll] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [isReload, setIsReload] = useState(false);

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
        const result = await ListCategories();
        setDataAll(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [isReload]);

  const handleChangeStatus = async (e, category_id) => {
    const payload = {
      category_id: category_id,
      category_status: e.target.checked,
    };
    await UpdateCategories(payload);

    setIsReload(!isReload);
    Notification.success("Updated status successfully!");
  };

  const dataThead = ["No.", "Name", "Description", "Status", "Action"];
  const dataBody = [];

  dataBody.push(
    dataAll?.map((item, index) => (
      <tr key={index} className="border-b border-[#bdbdbd]">
        <td className="py-3 px-5  text-center">
          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">
            {index + 1}
          </p>
        </td>
        <td className="py-3 px-5  text-center ">
          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">
            {item.category_name}
          </p>
        </td>
        <td className="py-3 px-5  text-center ">
          <p className="block antialiased font-sans text-sm leading-normal font-semibold">
            {item.category_desc}
          </p>
        </td>
        <td className="py-3 px-5  text-center ">
          <ToggleSwitch
            onChange={(e) => handleChangeStatus(e, item.category_id)}
            checked={item.category_status === 1 ? true : false}
          />
        </td>
        <td className="py-3 px-5  text-center  flex justify-center gap-5">
          <Link href={`/category/${item.category_id}`}>
            <FaPenToSquare className="h-5" />
          </Link>
          <button onClick={() => setIsOpen(true)}>
            <HiArchiveBoxXMark className="h-5 hover:text-red" />
          </button>
        </td>
      </tr>
    ))
  );

  const handleDelete = () => {
    setIsOpen(false);
  };

  const handleCreate = async (data) => {
    console.log(data);
  };

  const ContentModal = (
    <form onSubmit={handleSubmit(handleCreate)}>
      <p className="uppercase text-center mb-5 font-bold border-b-2 pb-4">
        Create Category
      </p>
      <div className="flex gap-5">
        <div>
          <label htmlFor="category_name" className="text-[#919191] mb-2">
            Category Name
          </label>
          <InputForm
            register={register("name", {
              required: "Name cannot be left blank",
            })}
            type="text"
            placeholder={"Name"}
          />
          {errors.name && errors.name.type === "required" && (
            <span className="text-red text-xs italic">
              {errors.name.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="category_desc" className="text-[#919191] mb-2">
            Category Description
          </label>
          <InputForm
            register={register("description")}
            type="text"
            placeholder={"Description"}
          />
        </div>
      </div>
      <div className="flex justify-end mt-5 gap-4">
        <ButtonModal
          title={"Cancel"}
          type={"button"}
          sizeSm={true}
          onClick={() => setIsNewCategory(false)}
          textBlack={true}
          className={"border-black border-[1px] bg-slate-300 w-20"}
        />
        <ButtonModal
          title={"Create"}
          type={"submit"}
          sizeSm={true}
          className={"w-20 bg-blue-500"}
        />
      </div>
    </form>
  );

  return (
    <>
      <div className="flex justify-end mb-5">
        <ButtonIcon
          title={"Add Category"}
          icon={<FaPlus />}
          type={"submit"}
          onClick={() => setIsNewCategory(true)}
        />
        <Modal
          isOpen={isNewCategory}
          setIsOpen={setIsNewCategory}
          content={ContentModal}
        />
      </div>
      <TableForm dataThead={dataThead} dataBody={dataBody} />
      <ConfirmDelete
        title={"Do you want to delete the category?"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClick={handleDelete}
      />
    </>
  );
};
