"use client";
import { useState } from "react";
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
