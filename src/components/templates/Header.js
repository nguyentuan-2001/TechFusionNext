import Link from "next/link";

export const Header = () => {
  return (
    <>
      <header>
        <div className="company-logo">D</div>
        <nav className="navbar">
          <ul className="nav-items">
            <li className="nav-item">
              <Link href="/home" className="nav-link">
                HOME
              </Link>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                OFFER
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                SHOP
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
    </>
  );
};
