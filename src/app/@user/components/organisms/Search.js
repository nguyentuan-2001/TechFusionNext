import { FaSearch } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

export const Search = ({ showSearch, setShowSearch }) => {
  const toggleSearch = () => {
    setShowSearch(!showSearch);
    console.log(23);
  };
  return (
    <>
      {/* <!--==================== SEARCH ====================--> */}
      <div className={`search ${showSearch ? "show-search" : ""}`} id="search">
        <form action="" className="search__form">
          <FaSearch />
          <input
            type="search"
            placeholder="What are you looking for?"
            className="search__input"
          />
        </form>

        <span onClick={toggleSearch}>
          <AiOutlineClose className="search__close" id="search-close" />
        </span>
      </div>
    </>
  );
};
