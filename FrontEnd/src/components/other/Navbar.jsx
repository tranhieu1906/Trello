import { Disclosure } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";
import Dropdown from "./Dropdown";
import DropdownAccount from "./DropdownAccount";
import Search from "./Search";
import Notification from "./Notification";

const Navbar = () => {
  return (
    <Disclosure as="nav" className="bg-blue-800">
      {({ open }) => (
        <>
          <div className="max-w-8xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <a href="/">
                    <img
                      style={{
                        width: "120px",
                        height: "65px",
                        marginRight: "20px",
                      }}
                      className="hidden h-8 w-auto lg:block"
                      src="https://download.logo.wine/logo/Trello/Trello-White-Logo.wine.png"
                      alt="Your Company"
                    />
                  </a>
                </div>
                <div
                  style={{ marginTop: "15px " }}
                  className="hidden sm:ml-6 sm:block"
                >
                  <div className="flex space-x-4">
                    <Dropdown icon={true} name={"Các không gian làm việc"} />
                    <Dropdown icon={false} name={"Tạo mới"} />
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Search />
                {/*<button*/}
                {/*  type="button"*/}
                {/*  className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"*/}
                {/*>*/}
                {/*  <span className="sr-only">View notifications</span>*/}
                {/*  <BellIcon className="h-6 w-6" aria-hidden="true" />*/}
                {/*</button>*/}
                <Notification />
                {/* Profile dropdown */}
                <DropdownAccount />
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
