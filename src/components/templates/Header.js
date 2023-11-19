import Link from "next/link";
import { MiniCart } from "../organisms/MiniCart";

export const Header = () => {
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
          </ul>
        </nav>
      </header>

      <MiniCart />
    </>
  );
};
