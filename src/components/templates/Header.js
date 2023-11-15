export const Header = () => {
  return (
    <>
      <header>
        <div className="company-logo">D</div>
        <nav className="navbar">
          <ul className="nav-items">
            <li className="nav-item">
              <a href="#" className="nav-link">
                HOME
              </a>
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
        <div className="menu-toggle">
          <i className="bx bx-menu"></i>
          <i className="bx bx-x"></i>
        </div>
      </header>
    </>
  );
};
