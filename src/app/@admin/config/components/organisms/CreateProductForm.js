"use client";

import { Controller, useForm } from "react-hook-form";
import { ButtonModal } from "../atoms/Button";
import { InputFormAdmin, InputModal } from "../atoms/Input";
import { UploadImage } from "../molecules/UploadImage";
import { useState } from "react";
import { UploadInfoImage } from "../molecules/UploadInfoImage";
import { FaPlusCircle } from "react-icons/fa";
import { ConvertFirebase } from "../../utils/firebase";
import { Select } from "../atoms/Select";
import { ComboBoxSelect } from "../atoms/ComboBoxSelect";

const CreateProductForm = ({ isNew = true }) => {
  const {
    register,
    handleSubmit,
    reset,
    methods,
    control,
    formState: { errors },
  } = useForm();

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFilesInfo, setSelectedFilesInfo] = useState([]);

  function convertColors(data) {
    if (data) {
      const colorProperties = Object.keys(data).filter((key) =>
        key.startsWith("color-")
      );

      // Tạo một mảng colors từ các thuộc tính màu sắc và quantity
      const colors = colorProperties.map((colorKey) => {
        const index = colorKey.split("-")[1];
        return {
          color_name: data[colorKey],
          quantity: data[`quantity-${index}`],
        };
      });
      return colors;
    }
  }

  const handleCreate = async (data) => {
    let urlGalery;
    if (selectedFiles) {
      urlGalery = await ConvertFirebase({ images: selectedFiles });
    }
    const colors = convertColors(data);
    console.log(data);

    const dataSend = {
      category_id: 1,
      product_sale: 10,
      product_name: "Test Product",
      product_price: 100,
      product_content: "Product description",
      product_image: "test_image.jpg",
      product_status: 1,
      product_ram: "8GB",
      hard_drive: "1TB",
      product_card: "NVIDIA GeForce GTX 1660",
      desktop: "Gaming",
      colors: [
        {
          color_name: "Red",
          quantity: 50,
        },
        {
          color_name: "Black",
          quantity: 3,
        },
      ],
    };
  };
  const handleUpdate = async (data) => {};

  const handleCloseModal = () => {
    setIsNew(false);
    setIsNewCategory(false);
  };

  const [forms, setForms] = useState([{}]);

  const addForm = () => {
    setForms([...forms, {}]);
  };

  return (
    <>
      <form onSubmit={handleSubmit(isNew ? handleCreate : handleUpdate)}>
        <p className="uppercase text-center mb-5 font-bold border-b-2 pb-4">
          {isNew ? "Create" : "Update"} Product
        </p>

        <div className="flex items-center justify-between gap-5 p-10 rounded-lg bg-slate-300">
          <div className="h-56 w-56">
            <UploadInfoImage
              name={"Product Image"}
              selectedFiles={selectedFilesInfo}
              setSelectedFiles={setSelectedFilesInfo}
            />
          </div>
          <div className="w-[85%]">
            <div className="flex gap-5">
              <Controller
                methods={methods}
                name="province"
                control={control}
                rules={{ required: "Province is required" }}
                render={({ field }) => {
                  const { onChange, value, ref } = field;
                  return (
                    <ComboBoxSelect/>
                  );
                }}
              />

              {errors.province && (
                <p className="text-[#FF6868] pb-3">{errors.province.message}</p>
              )}

              <InputFormAdmin
                register={register("product_name", {
                  required: "Product Name cannot be left blank",
                })}
                type="text"
                placeholder={"Name"}
                label={"Product Name"}
                required={true}
                errors={errors}
                name={"product_name"}
              />
              <InputFormAdmin
                register={register("product_content")}
                type="text"
                placeholder={"Product content"}
                label={"Product Content"}
              />
              <InputFormAdmin
                register={register("product_sale")}
                type="text"
                placeholder={"Product Sale"}
                label={"Product Sale"}
              />
              <InputFormAdmin
                register={register("product_price", {
                  required: "Product price cannot be left blank",
                })}
                type="text"
                placeholder={"Product Price"}
                label={"Product Price"}
                required={true}
                errors={errors}
                name={"product_price"}
              />
            </div>
            <div className="flex gap-5 my-5">
              <InputFormAdmin
                register={register("product_ram")}
                type="text"
                placeholder={"Product ram"}
                label={"Product Ram"}
              />
              <InputFormAdmin
                register={register("hard_drive")}
                type="text"
                placeholder={"Hard Drive"}
                label={"Hard Drive"}
              />
              <InputFormAdmin
                register={register("product_card")}
                type="text"
                placeholder={"Product Card"}
                label={"Product Card"}
              />
              <InputFormAdmin
                register={register("desktop")}
                type="text"
                placeholder={"Desktop"}
                label={"Desktop"}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-10 mt-10 p-10 rounded-lg bg-slate-300">
          <div className="">
            <ButtonModal
              title={"New form"}
              type={"button"}
              sizeSm={true}
              onClick={addForm}
              textBlack
              className={"border-black border-[1px] border-solid"}
              icon={<FaPlusCircle />}
            />
            <p className="text-[#5c677e] font-medium text-sm pb-2 mt-4">
              Product Colors
            </p>
          </div>
          <div className="flex flex-col gap-5 mt-10">
            {forms.map((form, index) => (
              <div className="flex gap-5" key={index}>
                <InputFormAdmin
                  register={register(`color-${index}`, {
                    required: "Color name cannot be left blank",
                  })}
                  type="text"
                  placeholder={"Color Name"}
                  label={"Color Name"}
                  required={true}
                  errors={errors}
                  name={`color-${index}`}
                />
                <InputFormAdmin
                  register={register(`quantity-${index}`, {
                    required: "Quantity cannot be left blank",
                  })}
                  type="text"
                  placeholder={"Quantity"}
                  label={"Quantity"}
                  required={true}
                  errors={errors}
                  name={`quantity-${index}`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="p-10 rounded-lg bg-slate-300 mt-10">
          <p className="text-[#5c677e] font-medium text-sm pb-2">
            Product Galleries
          </p>
          <UploadImage
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
          />
        </div>
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
    </>
  );
};
export default CreateProductForm;
