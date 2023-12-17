"use client";
import { useForm } from "react-hook-form";
import "../../styles/login.css";
import { Facebook, Google } from "../atoms/Icon";
import { InputForm } from "../atoms/Input";
import { useState } from "react";
import axios from "axios";
import Path from "@/utils/auth";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [create, setCreate] = useState();

  const onSubmit = (d) => {
    const loginData = {
      customer_name: d.username,
      customer_password: d.password,
    };

    axios
      .post(Path.API + "/customer/login", loginData)
      .then((response) => {
        if (response.data.data.length !== 0) {
          Cookies.set("token", response.data.data.access_token);
          const id_customer = btoa(response.data.data.customer.customer_id); // Sử dụng hàm btoa() để mã hóa Base64
          Cookies.set("id_customer", id_customer);
          router.back();
        } else {
          alert("Username or password is incorrect");
        }
      })
      .catch((error) => {
        console.error("Error placing order:", error);
      });
  };

  return (
    <>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>{create ? "Signup" : "Signin"}</h3>

        <label htmlFor="username">Username</label>
        <InputForm
          register={register("username", {
            required: "username cannot be left blank",
          })}
          type="text"
          placeholder={"username"}
        />
        {errors.username && errors.username.type === "required" && (
          <span className="text-red text-xs italic">
            {errors.username.message}
          </span>
        )}

        <label htmlFor="password">Password</label>
        <InputForm
          register={register("password", {
            required: "password cannot be left blank",
          })}
          type="password"
          placeholder={"password"}
        />
        {errors.password && errors.password.type === "required" && (
          <span className="text-red text-xs italic">
            {errors.password.message}
          </span>
        )}

        <input type="submit" value={"Log In"} className="input_button" />

        <p className="text-center mt-5">
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => setCreate(!create)}
          >
            {create ? "Signup" : "Signin"}
          </span>
        </p>

        <div className="social">
          <div className="go">
            <Google className={"h-5"} /> Google
          </div>
          <div className="fb">
            <Facebook className={"h-5"} /> Facebook
          </div>
        </div>
      </form>
    </>
  );
};
