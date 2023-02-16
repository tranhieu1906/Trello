import { Fragment } from "react";

import { Menu, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/features/auth/authSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DropdownAccount() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="sr-only">Open user menu</span>
          <img className="h-8 w-8 rounded-full" src={userInfo?.avatar} alt="" />
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              <h3 className="font-bold ml-4">Tài khoản</h3>
            </Menu.Item>
            <Menu.Item>
              <p className="font-normal text-sm ml-4">{userInfo?.name}</p>
            </Menu.Item>
            <hr />
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/manager-profile"
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  Quản lý tài khoản
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/#"
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  Hoạt động
                </Link>
              )}
            </Menu.Item>
          </div>

          <hr />
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => {
                    dispatch(logout());
                  }}
                  className={classNames(
                    active ? "bg-gray-100 w-full" : "",
                    "block px-4 py-2 text-sm text-gray-700 w-full"
                  )}
                >
                  Đăng xuất
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
