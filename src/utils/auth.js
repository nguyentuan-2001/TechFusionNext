import SERVICES from "@/services";
import Cookies from "js-cookie";

export const LoginCustomer = async (payload) => {
  try {
    const { data, status } = await SERVICES.loginCustomer(payload);
    if (status === 200) {
      Cookies.set("token", data.data.access_token);
      const id_customer = btoa(data.data.customer.customer_id); // Sử dụng hàm btoa() để mã hóa Base64
      Cookies.set("id_customer", id_customer);
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const ListProducts = async () => {
  try {
    const { data, status } = await SERVICES.getProducts();
    if (status === 200) {
      return data
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const BuyProduct = async (payload) => {
  try {
    const { data, status } = await SERVICES.buyProduct(payload);
    if (status === 200) {
      
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const ListCarts = async (payload) => {
  try {
    const { data, status } = await SERVICES.getCarts(payload);
    if (status === 200) {
      return data.data
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const DeleteProductCart = async (payload) => {
  try {
    const { data, status } = await SERVICES.deleteProductCart(payload);
    if (status === 200) {
      return data.data
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};