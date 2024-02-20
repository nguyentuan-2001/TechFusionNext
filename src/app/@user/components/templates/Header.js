import Link from "next/link";
import { MiniCart } from "../organisms/MiniCart";
import { Dropdown } from "../atoms/Dropdown";
import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import "../../styles/remixicon.css";
import { FaSearch } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa6";
import { Search } from "../organisms/Search";
import { LoginForm } from "../organisms/LoginForm";
import { AuthContext } from "../contexts/AuthContext";

export const Header = () => {
  const storedIdCustomer = Cookies.get("id_customer");
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { isShowLogin, setIsShowLogin } = useContext(AuthContext);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const toggleLogin = () => {
    setIsShowLogin(!isShowLogin);
    router.refresh();
  };

  const router = useRouter();
  const [listitem, setListitem] = useState([]);

  const Signout = () => {
    Cookies.remove("token");
    Cookies.remove("id_customer");
    router.refresh();
  };
  const Account = () => {
    router.push("/");
  };

  const clickCart = () => {
    if (storedIdCustomer) {
      router.push("/cart");
    } else {
      setIsShowLogin(true);
    }
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
          onclick: toggleLogin,
        },
      ]);
    }
  }, [storedIdCustomer]);

  return (
    <>
      <header className="header" id="header">
        <nav className="nav container">
          <Link href="/" className="nav__logo">
            KENTA
          </Link>

          <div
            className={`nav__menu ${showMenu ? "show-menu" : ""}`}
            id="nav-menu"
          >
            <ul className="nav__list">
              <li className="nav__item">
                <Link href="/" className="nav__link">
                  Home
                </Link>
              </li>

              <li className="nav__item">
                <Link href="/product" className="nav__link">
                  Products
                </Link>
              </li>

              <li className="nav__item">
                <a href="#" className="nav__link">
                  News
                </a>
              </li>

              <li className="nav__item">
                <a href="#" className="nav__link">
                  Shopping Guide
                </a>
              </li>

              <li className="nav__item">
                <a href="#" className="nav__link">
                  Contact
                </a>
              </li>
            </ul>

            {/* Close button */}
            <div className="nav__close" id="nav-close" onClick={toggleMenu}>
              <AiOutlineClose />
            </div>
          </div>

          <div className="nav__actions">
            {/* Search button */}
            <span onClick={toggleSearch} id="search-btn">
              <FaSearch />
            </span>

            {/* Cart */}
            <div className="cursor-pointer" onClick={clickCart}>
              <FaShoppingCart className=" w-5 h-5" />
            </div>

            {/* Login button */}
            <Dropdown
              content={
                <span id="login-btn">
                  <FaRegUser />
                </span>
              }
              listitem={listitem}
            />

            {/* Toggle button */}
            <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
              <FiMenu />
            </div>
          </div>
        </nav>
      </header>

      <Search showSearch={showSearch} setShowSearch={setShowSearch} />

      <LoginForm isShowLogin={isShowLogin} setIsShowLogin={setIsShowLogin} />
    </>
  );
};
