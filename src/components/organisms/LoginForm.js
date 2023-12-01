"use client";
import { useForm } from "react-hook-form";
import "../../styles/login.css";
import { Facebook, Google } from "../atoms/Icon";
import { InputForm } from "../atoms/Input";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (d) => {
    console.log(d);
  };

  return (
    <>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Login</h3>

        <label htmlFor="username">Username</label>
        <InputForm
          register={register("username", {
            required: "username cannot be left blank",
          })}
          type="text"
          placeholder={"username"}
        />

        <label htmlFor="password">Password</label>
        <InputForm
          register={register("password", {
            required: "password cannot be left blank",
          })}
          type="password"
          placeholder={"password"}
        />

        <input type="submit" value={"Log In"} className="input_button" />

        <p className="text-center mt-5">
          or <span className="text-blue-500 cursor-pointer hover:underline">Sign up</span>
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
