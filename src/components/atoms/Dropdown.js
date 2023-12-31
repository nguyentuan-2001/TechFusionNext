import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

export const Dropdown = ({ content, listitem }) => {
  return (
    <Menu as="div" className={`relative inline-block text-left`}>
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-none px-3 text-sm font-semibold shadow-sm text-white ring-inset ring-gray-300 hover:bg-gray-50">
          {content}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-52 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none translate-x-10 translate-y-6">
          <div
            className="absolute h-0 w-0 border-solid right-11"
            style={{
              transform: "translateY(-12px)",
              borderWidth: "0 15px 15px 15px",
              borderColor: "transparent transparent #fff transparent",
            }}
          ></div>
          <div className="py-1">
            {listitem?.map((item, index) => (
              <Menu.Item key={index}>
                <p
                  className={
                    "block px-4 py-2 text-sm cursor-pointer hover:bg-gray_light"
                  }
                  onClick={item.onclick}
                >
                  {item.text}
                </p>
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
