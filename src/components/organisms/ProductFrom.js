export const ProductSection2 = ({ left }) => {
  return (
    <>
      {left ? (
        <div className="offer offer-1">
          <img
            src="https://github.com/r-e-d-ant/Computer-store-website/blob/main/assets/images/offer_1.png?raw=true"
            alt="a computer in dark with with white shadow"
            className="offer-img offer-1-img"
          />
          <div className="offer-description offer-desc-1">
            <h2 className="offer-title">Macbook pro</h2>
            <p className="offer-hook">
              This a Macbook pro nulla vulputate magna vel odio sagittis
              bibendium...
            </p>
            <div className="cart-btn">ADD TO CART</div>
          </div>
        </div>
      ) : (
        <>
          <div className="offer offer-2">
            <img
              src="https://github.com/r-e-d-ant/Computer-store-website/blob/main/assets/images/offer_2.png?raw=true"
              alt="a opened computer"
              className="offer-img offer-2-img"
            />
            <div className="offer-description offer-desc-2">
              <h2 className="offer-title">Lenovo</h2>
              <p className="offer-hook">
                This a Lenovo nulla vulputate magna vel odio sagittis
                bibendium...
              </p>
              <div className="cart-btn">ADD TO CART</div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export const ProductSection3 = () => {
  return (
    <>
      <div className="product product-1">
        <img
          src="https://github.com/r-e-d-ant/Computer-store-website/blob/main/assets/images/comp_1.png?raw=true"
          alt="computer to sell"
          className="product-img"
        />
        <span className="product_add_cart">ADD TO CART</span>
      </div>
    </>
  );
};
