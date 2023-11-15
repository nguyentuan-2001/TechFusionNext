export const TopFooter = () => {
  return (
    <>
      <section className="section-4">
        <div className="sponsor sponsor-1">
          <img
            src="https://raw.githubusercontent.com/r-e-d-ant/Computer-store-website/b90ac65459206fef22e9b87313f587185554263b/assets/images/microsoft.svg"
            alt=""
          />
        </div>
        <div className="sponsor sponsor-2">
          <img
            src="https://raw.githubusercontent.com/r-e-d-ant/Computer-store-website/b90ac65459206fef22e9b87313f587185554263b/assets/images/apple.svg"
            alt=""
          />
        </div>

        <div className="sponsor sponsor-3">
          <img
            src="https://raw.githubusercontent.com/r-e-d-ant/Computer-store-website/b90ac65459206fef22e9b87313f587185554263b/assets/images/dell.svg"
            alt=""
          />
        </div>
        <div className="sponsor sponsor-4">
          <img
            src="https://raw.githubusercontent.com/r-e-d-ant/Computer-store-website/b90ac65459206fef22e9b87313f587185554263b/assets/images/ibm.svg"
            alt=""
          />
        </div>
      </section>
      <section className="section-5">
        <h2 className="subscribe-input-label">NEWSLETTER</h2>
        <div className="subscribe-container">
          <input
            type="text"
            id="email-subscribe"
            placeholder="Email address..."
          />
          <input type="submit" value="SUBSCRIBE" />
        </div>
      </section>
    </>
  );
};
