import { FiSettings } from "react-icons/fi";
import { FaBell, FaCircleUser } from "react-icons/fa6";
import "../../styles/header.css";
import Link from "next/link";

export const Header = () => {
  return (
    <>
      <div className="flex items-center justify-between py-5 pr-5">
        <div className="w-full text-sm">
          Dashboard/ <span className="text-black">Home</span>
        </div>
        <div className="flex justify-end w-full">
          <Link href="#/auth/sign-in">
            <button
              className="align-middle select-none font-sans font-bold text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3 rounded-lg text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 hidden items-center gap-1 px-4 xl:flex normal-case"
              type="button"
            >
              <FaCircleUser className="text-lg" />
              Sign In
            </button>
          </Link>
          <button
            className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-blue-gray-500 hover:bg-[#6a778e] hover:text-white button-notification"
            type="button"
          >
            <span className="flex justify-center items-center text-lg notification-hover">
              <FaBell />
            </span>
          </button>
          <button
            className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-blue-gray-500 hover:bg-[#6a778e] hover:text-white button-setting"
            type="button"
          >
            <span className="flex justify-center items-center text-lg setting-hover">
              <FiSettings />
            </span>
          </button>
        </div>
      </div>
    </>
  );
};
