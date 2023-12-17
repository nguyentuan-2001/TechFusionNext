"use client";
import React, { useEffect, useState, useCallback } from "react";
import "../../styles/atoms.css";

export const InputQuantity = ({ quantity, setQuantity }) => {
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <div className="input_quantity">
      <button type="button" onClick={handleDecrement}>
        -
      </button>
      <input type="number" value={quantity} readOnly />
      <button type="button" onClick={handleIncrement}>
        +
      </button>
    </div>
  );
};



export const InputForm = ({
  register,
  placeholder,
  type,
  className,
  autoComplete,
  disabled,
}) => {
  return (
    <input
      type={type}
      {...register}
      placeholder={placeholder}
      className={`w-full h-14 border rounded-lg p-3 pl-[20px] bg-slate-500 text-base focus:outline-none text-white focus:border-white  ${
        disabled ? "text-opacity-80" : "text-opacity-100"
      } + ${className} `}
      style={{ "--tw-ring-color": "rgba(0,0,0,0.6)" }}
      autoComplete={autoComplete}
      disabled={disabled}
    />
  );
};
