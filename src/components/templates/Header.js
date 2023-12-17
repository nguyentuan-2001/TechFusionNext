import Link from "next/link";
import { MiniCart } from "../organisms/MiniCart";
import { Dropdown } from "../atoms/Dropdown";
import { FaRegUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export const Header = () => {
  const storedIdCustomer = Cookies.get("id_customer");

  const router = useRouter();
  const [listitem, setListitem] = useState([]);

  const Signout = () => {
    Cookies.remove("token");
    Cookies.remove("id_customer");
    router.refresh();
  };
  const Account = () => {
    router.push("/account");
  };
  const Signin = () => {
    router.push("/signin");
  };

  useEffect(() => {
    if (storedIdCustomer) {
      setListitem([
        {
          text: "Account settings",
          onclick: Account,
        },
        {
          text: "Sign out",
          onclick: Signout,
        },
      ]);
    } else {
      setListitem([
        {
          text: "Signin",
          onclick: Signin,
        },
      ]);
    }
  }, [storedIdCustomer]);

  return (
    <>
      <header>
        <div className="company-logo">
          <Link href="/">KENTA</Link>
        </div>
        <nav className="navbar">
          <ul className="nav-items">
            <li className="nav-item">
              <Link href="/home" className="nav-link">
                HOME
              </Link>
            </li>

            <li className="nav-item">
              <Link href="/shop" className="nav-link">
                SHOP
              </Link>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                OFFER
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                CONTACT
              </a>
            </li>
            <li>
              <MiniCart content={<FaShoppingCart className="w-5 h-5" />} />
            </li>
            <li>
              <Dropdown
                content={<FaRegUser className="w-5 h-5" />}
                listitem={listitem}
              />
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
