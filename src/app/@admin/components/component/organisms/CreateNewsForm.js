"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { InputForm, InputFormAdmin } from "../atoms/Input";
import { CustomEditor } from "../molecules/FormEditor";
import { ButtonModal } from "../atoms/Button";
import { UploadInfoImage } from "../molecules/UploadInfoImage";

export const CreateNewsForm = ({ isNew = true }) => {
  const [content, setContent] = useState();
  const [selectedFilesInfo, setSelectedFilesInfo] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    methods,
    control,
    formState: { errors },
  } = useForm();

  const handleCreate = async (data) => {
    console.log(data);
  };

  const handleUpdate = async (data) => {};

  return (
    <form onSubmit={handleSubmit(isNew ? handleCreate : handleUpdate)}>
      <p className="uppercase text-center mb-5 text-lg font-bold border-b-2 pb-4 border-white">
        {isNew ? "Create" : "Update"} News
      </p>

      <div className="grid grid-cols-10 w-full items-center">
        <p className="text-[#3f4657] font-medium text-sm pb-2 col-span-1">
          News Content
        </p>
        <div className="col-span-9">
          <InputForm
            register={register("news_name", {
              required: "News name cannot be left blank",
            })}
            type="text"
            placeholder={"News name "}
          />
        </div>
      </div>
      
      <div className="flex gap-5">
        <div>
          <UploadInfoImage
            name={"News Image"}
            selectedFiles={selectedFilesInfo}
            setSelectedFiles={setSelectedFilesInfo}
          />
        </div>

        <div className="">
          <InputFormAdmin
            register={register("news_name", {
              required: "News name cannot be left blank",
            })}
            type="text"
            placeholder={"news name"}
            // label={"News Name"}
            // required={true}
            errors={errors}
            name={"news_name"}
          />

          <p className="text-[#3f4657] font-medium text-sm pb-2">
            News Content
          </p>
          <CustomEditor content={content} setContent={setContent} />
        </div>
      </div>

      <div className="flex justify-end mt-5 gap-4">
        <ButtonModal
          title={"Cancel"}
          type={"button"}
          sizeSm={true}
          // onClick={() => handleCloseModal()}
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
};
